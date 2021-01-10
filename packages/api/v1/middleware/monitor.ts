import { Request, Response, NextFunction } from "express";
import MonitorController from "../controllers/monitor";

class MonitorMiddleware {
    static getMonitors = (req: any, res: Response, next: NextFunction) => {
        new MonitorController(req.params.node_id, req.account._id).getMonitorData({})
            .then((Res) => {
                res.status(200).json(Res)
            })
            .catch(err => {
                res.status(err.status || 500).json({
                    message: err.message
                })
            })
    }

    static createMonitor = (req: any, res: Response, next: NextFunction) => {
        new MonitorController(req.params.node_id, req.account._id).createMonitorData(req.body)
            .then(Res => {
                res.status(200).json(Res)
            })
            .catch(err => {
                res.status(err.status || 500).json({
                    message: err.message
                })
            })
    }

    static getLatestMonitorData = (req: any, res: Response, next: NextFunction) => {
        new MonitorController(req.params.node_id, req.account._id).getLatestMonitorData()
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