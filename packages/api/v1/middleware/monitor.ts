import { Request, Response, NextFunction } from "express";
import MonitorController from "../controllers/monitor";

class MonitorMiddleware {
    static getMonitors = (req: Request, res: Response, next: NextFunction) => {
        new MonitorController(req.params.node_id).getMonitorData({})
            .then((Res) => {
                res.status(200).json(Res)
            })
            .catch(err => {
                res.status(err.status || 500).json({
                    message: err.message
                })
            })
    }

    static createMonitor = (req: Request, res: Response, next: NextFunction) => {
        new MonitorController(req.params.node_id).createMonitorData(req.body)
            .then(Res => {
                res.status(200).json(Res)
            })
            .catch(err => {
                res.status(err.status || 500).json({
                    message: err.message
                })
            })
    }
}

export default MonitorMiddleware