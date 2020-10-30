import express from "express";
import * as ProcessMiddleware from "../middleware/process";
import Checkers from "../middleware/checkers";

const router = express.Router();

router.get(
    "/process/active",
    Checkers.isLogggedin,
    Checkers.isVerified,
    ProcessMiddleware.fetchActiveProcessesMw
);

router.get(
    "/process",
    Checkers.isLogggedin,
    Checkers.isVerified,
    ProcessMiddleware.fetchAllProcesses
);

router.patch(
    "/process",
    Checkers.isLogggedin,
    Checkers.isVerified,
    ProcessMiddleware.updateProcessStatus
);

router.post(
    "/process",
    Checkers.isLogggedin,
    Checkers.isVerified,
    ProcessMiddleware.createProcess
);

router.post(
    "/process/add-command",
    Checkers.isLogggedin,
    Checkers.isVerified,
    ProcessMiddleware.addCommand
);

router.delete(
    "/process/delete-command",
    Checkers.isLogggedin,
    Checkers.isVerified,
    ProcessMiddleware.deleteCommand
);

router.delete(
    "/process/delete-process",
    Checkers.isLogggedin,
    Checkers.isVerified,
    ProcessMiddleware.deleteProcess
);

router.post(
    "/process/add-log",
    Checkers.isLogggedin,
    Checkers.isVerified,
    ProcessMiddleware.addLog
);

router.patch(
    "/process/sleep",
    Checkers.isLogggedin,
    Checkers.isVerified,
    ProcessMiddleware.makeProcessSleep
);

export default router;