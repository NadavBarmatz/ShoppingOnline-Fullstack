import nodemailer from "nodemailer";
import {EmailModel} from "../03-models/email-model";

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    auth: {
        user: "Tr4shingM30ut@gmail.com",
        pass: "trashingmeout"
    }
});

function send(email : EmailModel) {

    return new Promise((resolve, reject) => {
        const message = {
            to: email.to,
            subject: email.subject,
            text: email.body
        };
        transport.sendMail(message, (err, info) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(info);
        })
    })

}

export default {send};
