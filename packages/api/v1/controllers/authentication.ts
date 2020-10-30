import jwt from "jsonwebtoken";
import Email from "../services/email";
import bcrypt from "bcrypt";

import Account from "../../models/account"
import config from "../../config"

const {
    auth: { secretKey },
    links: { frontend_url },
} = config;

class Authentication {
    private data: any
    constructor(data: any) {
        this.data = data
    }

    public generateToken = (has_password: boolean | undefined | null, role: string | undefined | any, is_verified: boolean | undefined, id: string | undefined): any => {
        return jwt.sign(
            {
                data: this.data.email,
                has_password,
                role,
                id,
                is_verified,
            },
            secretKey
        );
    };

    public generateForeverToken = (has_password: boolean | undefined | null, role: string | undefined | any, is_verified: boolean | undefined, id: string | undefined) => {
        return jwt.sign(
            {
                data: this.data.email,
                has_password,
                role,
                id,
                is_verified,
            },
            secretKey
        );
    };

    public generateInfiniteToken = () => {
        return jwt.sign(
            {
                email: this.data.email,
            },
            secretKey
        );
    };

    public decodeToken = (token: string): any => {
        try {
            return jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    throw {
                        status: 403,
                        message: "Session is invalid",
                        logout: true,
                    };
                } else {
                    return decoded;
                }
            });
        } catch (e) {
            throw {
                status: 403,
                message: "Session is invalid",
                logout: true,
            };
        }
    };

    public sendEmail = async (action: string, email: string): Promise<any> => {
        let options;
        switch (action) {
            case "VERIFY":
                const token = this.generateInfiniteToken();
                new Email().sendEmail(
                    email,
                    "Verify Account",
                    `
                Hello, all you got to do is click this <a href="${frontend_url}/verify/${token}">link</a> and your account is verified
                `
                );
                break;
            default:
                options = {};
                break;
        }
    };

    public addPassword = async (password: string) => {
        this.data.password = password;
        if (this.validatePassword()) {
            let account = await Account.findOne({ email: this.data.email });

            if (account) {
                Object.assign(account, {
                    password: bcrypt.hashSync(password, 10),
                    has_password: true,
                });

                await account.save();
                const token = this.generateToken(
                    account.has_password,
                    account.role,
                    account.is_verified,
                    account._id
                );
                return {
                    token,
                };
            } else {
                throw {
                    status: 403,
                    message: "🥺 Account not found, you can join",
                };
            }
        } else {
            throw {
                status: 400,
                message: "🥺 A valid email that's it",
            };
        }
    };

    public sendVerifyEmail = async () => {
        const sender = await this.sendEmail("VERIFY", this.data.email);

        sender
            .then(() => {
                return {
                    message: "Email has been sent",
                };
            })
            .catch(() => {
                throw {
                    status: 400,
                    message: "Probelem sending email 🥺 try again",
                };
            });
    };

    public verifyAccount = async () => {
        const data = this.decodeToken(this.data.token);

        const user = await Account.findOne({ email: data.email });

        if (user) {
            Object.assign(user, {
                is_verified: true,
            });

            await user.save();

            return {
                token: this.generateToken(
                    user.has_password,
                    user.role,
                    user.is_verified,
                    user._id
                ),
            };
        } else {
            throw {
                status: 404,
                message: "Email was not found",
            };
        }
    };

    public registerUser = async () => {
        if (this.validateEmail()) {
            const newAccount = new Account({
                email: this.data.email,
                name: this.data.email.replace(/@.*$/, ""),
            });

            await newAccount.save();

            const token = this.generateToken(
                newAccount.has_password,
                newAccount.role,
                newAccount.is_verified,
                newAccount._id
            );

            this.sendEmail("VERIFY", this.data.email);

            return {
                token,
            };
        } else {
            throw {
                status: 400,
                message: "🥺 A valid email that's it",
            };
        }
    };

    public loginUser = async () => {
        if (this.validateEmail()) {
            if (this.data.has_password) {
                if (this.validatePassword()) {
                    const account = await Account.findOne({ email: this.data.email });

                    if (account) {
                        if (bcrypt.compareSync(this.data.password, account.password)) {
                            if (account.is_verified) {
                                const token = this.generateToken(
                                    account.has_password,
                                    account.role,
                                    account.is_verified,
                                    account._id
                                );

                                return {
                                    token,
                                };
                            } else {
                                throw {
                                    status: 400,
                                    message: "Verify you email",
                                    resend: true,
                                };
                            }
                        } else {
                            throw {
                                status: 403,
                                message: "🥺 Invalid email/password",
                            };
                        }
                    } else {
                        throw {
                            status: 403,
                            message: "🥺 Account not found, you can join",
                        };
                    }
                } else {
                    throw {
                        status: 400,
                        message: "🥺 I also hate passwords but that one is too short",
                    };
                }
            } else {
                const account = await Account.findOne({ email: this.data.email });

                if (account) {
                    if (account.is_verified) {
                        const token = this.generateToken(
                            account.has_password,
                            account.role,
                            account.is_verified,
                            account._id
                        );

                        return {
                            token,
                        };
                    } else {
                        throw {
                            status: 400,
                            message: "Verify your email",
                            resend: true,
                        };
                    }
                } else {
                    throw {
                        status: 403,
                        message: "🥺 Account not found, you can join",
                    };
                }
            }
        } else {
            throw {
                status: 400,
                message: "🥺 A valid email that's it",
            };
        }
    };

    public validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(this.data.email)) {
            throw {
                status: 400,
                message: "Invalid email",
            };
        } else {
            return true;
        }
    };

    public validatePassword = () => {
        if (this.data.password.length < 6) {
            throw {
                status: 400,
                message: "Password is too short",
            };
        } else {
            return true;
        }
    };

    public fetchAccount = async () => {
        const account = await Account.findOne(
            {
                email: this.data.email,
            },
            {
                email: -1,
                name: -1,
                is_verified: -1,
                has_password: -1,
                role: -1,
            }
        );

        if (account) {
            return {
                account,
            };
        } else {
            throw {
                status: 404,
                message: "Account not found",
            };
        }
    };
}

export default Authentication