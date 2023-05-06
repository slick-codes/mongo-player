import nodemailer from 'nodemailer'
import path from 'path'

const config = {
    host: process.env.EMAIL_HOST,
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
}

const transporter = nodemailer.createTransport(config)

interface emailObject {
    subject: string;
    from: string;
    context: {
        email: string;
        body: string;
        title: string;
        sendersName: string | void;
    }
}

export const sendEmail = async function (object: emailObject): Promise<void> {
    const { title, email, sendersName, body } = object.context

    await transporter.sendMail({
        to: process.env.EMAIL_TO,
        subject: object.subject,
        from: object.from,
        html: `
                <div style="background:black; color:white; padding: .5em;">
                    <h1>Hello Paul you've got a message from ${sendersName}</h1>
                </div>

                <h2>Sender's details</h2>
                <h4>Name: ${sendersName}</h4>
                <h4>Email: ${email}</h4>
                <h3>${title}</h3>
                <h3>Message</h3>
                ${body}
                `
    })
}
