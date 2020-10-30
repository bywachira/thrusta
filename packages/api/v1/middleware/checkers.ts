import { Request, Response, NextFunction } from "express"
import jwt, { decode } from "jsonwebtoken";
import config from "../../config";
import Account from "../../models/account";

class Checkers {
    static isLogggedin = (req: any, res: Response, next: NextFunction) => {
        const token: any = req.headers["authorization"];

        if (!token) {
            res.status(403).json({
                status: 403,
                message: "Seems like you haven't logged in",
            });
        }

        jwt.verify(token, config.auth.secretKey, async (err: any, decoded: any) => {
            if (err)
                return res.status(500).json({
                    status: 403,
                    message: "Seems like you haven't logged in",
                    logout: true,
                });

            const account = await Account.findOne(
                { email: decoded.data },
                { password: 0 }
            );

            if (!account) {
                return res.status(404).json({
                    message: "Account not recognised",
                });
            }
            req.account = account;
            next();
        });
    };

    static hasPassword = (req: any, res: Response, next: NextFunction) => {
        if (req.account.has_password) {
            next();
        } else {
            res.status(403).json({
                message: "Add a password first",
            });
        }
    };

    static isVerified = (req: any, res: Response, next: NextFunction) => {
        if (req.account.is_verified) {
            next();
        } else {
            res.status(403).json({
                message: "Verify your account",
            });
        }
    };
}

export default Checkers;