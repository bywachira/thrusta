import { Request, Response, NextFunction } from "express"
import AuthController from "../controllers/authentication";

class AuthMiddleware {
    static loginUser = (req: Request, res: Response, next: NextFunction) => {
        new AuthController(req.body)
            .loginUser()
            .then((Res) => {
                res.status(200).json(Res);
            })
            .catch((err) => {
                res.status(err.status || 500).json({
                    message: err.message,
                    ...err,
                });
            });
    };

    static signupUser = (req: Request, res: Response, next: NextFunction) => {
        new AuthController(req.body)
            .registerUser()
            .then((Res) => {
                res.status(201).json(Res);
            })
            .catch((err) => {
                console.log(err)
                res.status(err.status || 500).json({
                    message: err.message,
                    ...err,
                });
            });
    };

    static addPassword = (req: any, res: Response, next: NextFunction) => {
        new AuthController(req.account)
            .addPassword(req.body.password)
            .then((Res) => {
                res.status(201).json(Res);
            })
            .catch((err) => {
                res.status(err.status || 500).json({
                    message: err.message,
                    ...err,
                });
            });
    };

    static verifyAccount = (req: Request, res: Response, next: NextFunction) => {
        new AuthController(req.body)
            .verifyAccount()
            .then((Res) => {
                res.status(200).json(Res);
            })
            .catch((err) => {
                res.status(err.status || 500).json({
                    message: err.message,
                    ...err,
                });
            });
    };

    static resendEmail = (req: Request, res: Response, next: NextFunction) => {
        new AuthController(req.body)
            .sendVerifyEmail()
            .then((Res) => {
                res.status(200).json(Res);
            })
            .catch((err) => {
                res.status(err.status || 500).json({
                    message: err.message,
                    ...err,
                });
            });
    };

    static fetchAccount = (req: any, res: Response, next: NextFunction) => {
        new AuthController(req.account)
            .fetchAccount()
            .then((Res) => {
                res.status(200).json(Res);
            })
            .catch((err) => {
                res.status(err.status || 500).json({
                    message: err.message,
                    ...err,
                });
            });
    };
}

export default AuthMiddleware;