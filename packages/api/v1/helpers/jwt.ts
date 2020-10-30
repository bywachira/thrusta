import jwt from "jsonwebtoken"
import config from "../../config"

const decode_token = async (token: string) => {
    return jwt.verify(token, config.auth.secretKey)
}

export {
    decode_token
}