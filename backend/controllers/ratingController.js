import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

function finalGrade(nota1, nota2, nota3, nota4, nota5) {
    let soma = (nota1 + nota2 + nota3 + nota4 + nota5)
    let media = soma / 5
    return media.toFixed(2)
}

var data = JSON.parse(fs.readFileSync(path.resolve('./samples/rating.json'), 'utf8'))
var acomData = JSON.parse(fs.readFileSync(path.resolve('./samples/accommodations.json'), 'utf8'))
var reserveData = JSON.parse(fs.readFileSync(path.resolve('./samples/reservation.json'), 'utf8'))

export const createRating = async (req, res) => {
    try {
        const { confortoGrade, checkinGrade, comunicacaoGrade, localizacaoGrade, limpezaGrade, comment } = req.body;
        if (!confortoGrade || !checkinGrade || !comunicacaoGrade || !localizacaoGrade || !limpezaGrade || !comment) {
            console.log("All fields are required");
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        //Verificação de validade das notas será realizada no front a partir de categorização das respostas

        const id = uuidv4();
        const acomName = acomData.nome
        const acomId = acomData.id
        const resId = reserveData.id


        const newRating = {
            id,
            acomName,
            confortoGrade,
            checkinGrade,
            comunicacaoGrade,
            localizacaoGrade,
            limpezaGrade,
            notaFinal: finalGrade(confortoGrade, checkinGrade, comunicacaoGrade, localizacaoGrade, limpezaGrade),
            comment,
            acomId,
            resId
        }

        const acomAvaliada = acomData.findIndex(acom => String(acom.id) === String(id))
        //acomAvaliada retorna o index no JSON da acomodação avaliada

        const acomodation = acomData[acomAvaliada]

        acomodation.ratingsId.push(id)

        data.push(newRating)

        res.status(201).json(newRating)

    } catch (error) {
        console.log("Error in ratingController:", error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}