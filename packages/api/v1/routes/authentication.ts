import express from "express";
import AuthMiddleware from "../middleware/authentication";
import Checkers from "../middleware/checkers";

const router = express.Router();

router.post("/login", AuthMiddleware.loginUser);

router.post("/signup", AuthMiddleware.signupUser);

router.put("/add-password", Checkers.isLogggedin, AuthMiddleware.addPassword);

router.put("/resend", AuthMiddleware.resendEmail);

router.get(
    "/account",
    Checkers.isLogggedin,
    Checkers.hasPassword,
    Checkers.isVerified,
    AuthMiddleware.fetchAccount
);

export default router;