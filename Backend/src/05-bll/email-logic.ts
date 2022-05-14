import nodemailer from "nodemailer";
import {EmailModel} from "../03-models/email-model";

// For security reasons, the email parameters are stored in ,env file.
// To make it work without .env file, simply put your email as user and password as pass.
const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
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
