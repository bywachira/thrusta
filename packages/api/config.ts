import dotenv from "dotenv";
import { IConfig } from "./index"

dotenv.config()

const config: IConfig = {
    email: {
        apiKey: process.env.ELASTICMAIL_KEY,
        pass: "4D88924773504E3017A2491B95C7271304BF",
        user: "no-reply@bywachira.com",
        server: "smtp.elasticemail.com",
        port: 2525
    },
    auth: {
        secretKey: "254P^as&@#f@sx2"
    },
    links: {
        frontend_url: process.env.FRONTEND_URL
    },
    mongo: {
        uri: process.env.DB_URL
    }
}

export default config