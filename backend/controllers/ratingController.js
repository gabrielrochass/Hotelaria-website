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
        const { confortoGrade, checkinGrade, comunicacaoGrade, localizacaoGrade, limpezaGrade, comment, resId } = req.body;
        if (!confortoGrade || !checkinGrade || !comunicacaoGrade || !localizacaoGrade || !limpezaGrade || !comment || !resId) {
            console.log("All fields are required");
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        const { acomId } = req.params

        //Verificação de validade das notas será realizada no front a partir de categorização das respostas

        let acomIndex = acomData.findIndex(acom => String(acom.id) === String(acomId))
        let acomName = acomData[acomIndex].nome

        const newRating = {
            id: uuidv4(),
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
        //acomAvaliada retorna o index no JSON da acomodação avaliada

        const acomodation = acomData[acomIndex]

        acomodation.ratingsId.push(newRating.id)

        data.push(newRating)

        res.status(201).json(newRating)

    } catch (error) {
        console.log("Error in ratingController:", error.message);
        res.status(500).json({
            error: "Internal Server Error (Create Rating)"
        });
    }
}
export const listRating = async (req, res) => {
    try {
        const { acomId } = req.params
        const ratings = data.filter(acom => String(acom.accommodationId) === String(acomId));
        res.status(200).json(ratings);

    } catch (error) {
        console.log("Error in ratingController:", error.message);
        res.status(400).json({
            error: "Internal Server Error (List Ratings)"
        });
    }
};


//Verificação de validade das notas será realizada no front a partir de categorização das respostas

