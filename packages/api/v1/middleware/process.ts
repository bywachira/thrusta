import { Response, NextFunction } from "express"
import * as ProcessController from "../controllers/process";

export const fetchActiveProcessesMw = (req: any, res: Response, next: NextFunction) => {
    ProcessController.fetchActiveProcesses(req.account._id)
        .then((Res) => {
            res.status(200).json(Res);
        })
        .catch((err) => {
            // console.log(err);
            res.status(err.status || 500).json({
                message: err.message,
            });
        });
};

export const fetchAllProcesses = (req: any, res: Response, next: NextFunction) => {
    ProcessController.fetchAllProcesses(req.account._id)
        .then((Res) => {
            res.status(200).json(Res);
        })
        .catch((err) => {
            res.status(err.status || 500).json({
                message: err.message,
            });
        });
};

export const updateProcessStatus = (req: any, res: Response, next: NextFunction) => {
    ProcessController.updateProcessStatus(
        req.account._id,
        req.body.process_id,
        "in_queue",
        false
    )
        .then((Res) => {
            res.status(200).json(Res);
        })
        .catch((err) => {
            res.status(err.status || 500).json({
                message: err.message,
            });
        });
};

export const createProcess = (req: any, res: Response, next: NextFunction) => {
    ProcessController.createProcess(
        req.body.process_name,
        req.body.commands,
        req.account._id,
        req.body.node_id
    )
        .then((Res) => {
            res.status(201).json(Res);
        })
        .catch((err) => {
            res.status(err.status || 500).json({
                message: err.message,
            });
        });
};

export const addCommand = (req: any, res: Response, next: NextFunction) => {
    ProcessController.addCommand(req.body.process_id, req.body.command)
        .then((Res) => {
            res.status(201).json(Res);
        })
        .catch((err) => {
            res.status(err.status || 500).json({
                message: err.message,
            });
        });
};

export const deleteCommand = (req: any, res: Response, next: NextFunction) => {
    ProcessController.deleteCommand(req.body.command_id)
        .then((Res) => {
            res.status(201).json(Res);
        })
        .catch((err) => {
            res.status(err.status || 500).json({
                message: err.message,
            });
        });
};

export const deleteProcess = (req: any, res: Response, next: NextFunction) => {
    ProcessController.deleteProcess(req.body.process_id)
        .then((Res) => {
            res.status(201).json(Res);
        })
        .catch((err) => {
            res.status(err.status || 500).json({
                message: err.message,
            });
        });
};

export const addLog = (req: any, res: Response, next: NextFunction) => {
    ProcessController.addLog(
        req.body.process_id,
        req.body.log,
        req.body.node,
        req.body.type, req.account._id
    )
        .then((Res) => {
            res.status(201).json(Res);
        })
        .catch((err) => {
            res.status(err.status || 500).json({
                message: err.message,
            });
        });
};

export const makeProcessSleep = (req: any, res: Response, next: NextFunction) => {
    ProcessController.makeProcessSleep(req.body.process_id)
        .then((Res) => {
            res.status(201).json(Res);
        })
        .catch((err) => {
            res.status(err.status || 500).json({
                message: err.message,
            });
        });
};