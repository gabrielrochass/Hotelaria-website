import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import genToken from '../utils/generateToken.js';
import { v4 as uuidv4 } from 'uuid';

export const signUp =  async (req, res) => {
    try {
        const { fullName, birthday, email, cellphone, password, confirmPassword } = req.body;

        // validações 
        // algum campo nulo 
        if (!fullName || !birthday || !email || !cellphone || !password || !confirmPassword) {
            console.log("All fields are required")
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        // senha e confirmaçao corretas 
        if (password !== confirmPassword){
            console.log("Passwords do not match");
            return res.status(400).json({
                error: "Passwords do not match"
            })
        }

        // tamanho e se eh digito
        const cellphoneRegex = /^\d{11}$/;
        if (!cellphoneRegex.test(cellphone)) {
            console.log("Cellphone must have eleven digits");
            return res.status(400).json({
                error: "Cellphone must have eleven digits"
            });
        }
        // validando data de aniversario 
        const birthdayRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        if (!birthdayRegex.test(birthday)) {
            console.log("Birthday must be in the format mm/dd/yyyy");
            return res.status(400).json({
                error: "Birthday must be in the format mm/dd/yyyy"
            });
        }       
        // validando email
        if (!email.includes("@")) {
            console.log("Email must contain an '@' character");
            return res.status(400).json({
                error: "Email must contain an '@' character"
            });
        }

        var data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'))
        // checando se o email já existe
        const user = data.filter(element => element.email === email)
        if (user && user.length > 0) {
            console.log("Email already used")
            return res.status(400).json({
                error: "Email already used"
            })
        }

        // criando o user

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userId = uuidv4();
        const id = userId;
        const empty = []; 

        const reservationsId = empty;
        const accommodationsId = empty;

        const newUser = {
            id,
            fullName,
            birthday,
            email,
            cellphone,
            password: hashedPassword,
            reservationsId,
            accommodationsId
        }
        
        genToken(id, res)

        data.push(newUser)

        fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2))

        res.status(201).json({
            id,
            fullName,
            email
        })

    }
    catch (error) {
        console.log("Error in signup controller:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        var data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf8'));
        var data = data.find(({ email }) => email === req.body.email);
        if (!data){
            console.log("Invalid credentials")
            return res.status(400).json({
                error: "Invalid credentials"
            })
        }
        const isPasswordCorrect = await bcrypt.compare(password, data.password);

        if (!data || !isPasswordCorrect) {
            console.log("Invalid credentials")
            return res.status(400).json({
                error: "Invalid credentials"
            })
        }

        genToken(data.id, res)

        res.status(200).json({
            id: data.id,
            fullName: data.fullName,
            email: data.email
        })

    } catch (error) {
        console.log("Error in login controller:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })

        res.status(200).json({
            message: "Logged out successfully"
        })

    } catch (error) {
        console.log("Error in logout controller:", error.message)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}