import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import authenticateToken from '../middleware/authentication.js';

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "essgrupo04@gmail.com",
      pass: "lkwxvgdaqddamtcj",
    },
    tls: {
        rejectUnauthorized: false
    }
  });

export const sendEmail = async (req, res) => {
    try {
        const { reservationId } = req.body;
        
        const reservationData = JSON.parse(fs.readFileSync(path.resolve('./samples/reservation.json'), 'utf8'));
        const usersData = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
        
        // procurando a reserva
        const reservation = reservationData.find(reservation => reservation.id === reservationId);
        if (!reservation) {
            console.log("Reservation not found")
                return res.status(400).json({
                    error: "Reservation not found"
                })
        }
        // verificando o user vinculado a reserva
        const user = usersData.find(user => user.id === reservation.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // corpo da email
        const mailtOptions = {
            from: {
                name: 'Grupo 04',
                address: process.env.USER
            },
            to: user.email, 
            subject: "Confirmação da Reserva", 
            html: `<b>Confirmação de Reserva</b>
            <p>Olá ${user.fullName},</p>
            <p>Sua reserva na acomodação ${reservation.accommodationName} foi confirmada.</p>
            <p>Detalhes da reserva:</p>
            <ul>
                <li>Nome da Acomodação: ${reservation.accommodationName}</li>
                <li>Número de Quartos: ${reservation.numRooms}</li>
                <li>Capacidade: ${reservation.capacity} pessoas</li>
                <li>Total Pago: R$${reservation.totalPaid}</li>
                <li>Quantidade de diárias: ${reservation.rates} noites</li>
            </ul>`
        }

        // enviando 
        await transporter.sendMail(mailtOptions);
        console.log("Email has been sent!");
        res.status(200).json({
            id: reservationId
        })

    } catch (error){
        console.log("Error in sending email: ", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

