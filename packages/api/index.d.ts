export interface IConfig {
    email: IEmailService
    auth: IAuth
    links: ILinks
    mongo: IMongo
}

export interface IEmailService {
    apiKey: string | undefined
    pass: string
    user: string
    server: string
    port: number
}

export interface IAuth {
    secretKey: string
}

export interface ILinks {
    frontend_url: string | undefined
}

export interface IMongo {
    uri: string | undefined | any | null
}