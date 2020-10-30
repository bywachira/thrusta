import nodemailer from "nodemailer"
import config from "../../config"

const { email } = config

class Email {
    private transporter: any
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: email.server,
            port: email.port,
            auth: {
                user: email.user,
                pass: email.pass
            }
        })
    }

    sendEmail = (to: string | undefined, subject: string | undefined, body: string | undefined) => {
        let mailOptions = {
            from: email.user,
            subject,
            to,
            html: body,
        };

        this.transporter.sendMail(mailOptions, (error: any) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent");
                this.transporter.close();
            }
        });
    }
}

export default Email