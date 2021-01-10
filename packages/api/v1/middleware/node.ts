import { Request, Response, NextFunction } from "express"
import NodeController from "../controllers/node";

class NodeMiddleware {
    static fetchAllNodes = (req: any, res: Response, next: NextFunction) => {
        new NodeController(req.account, {}).fetchAllNodes()
            .then((Res) => {
                res.status(200).json(Res);
            })
            .catch((err) => {
                res.status(err.status || 500).json({
                    message: err.message,
                });
            });
    };

    static getNode = (req: any, res: Response, next: NextFunction) => {
        new NodeController(req.account, {}).getNode(req.params.node_id)
            .then(Res => {
                res.status(200).json(Res)
            })
            .catch(err => {
                res.status(err.status || 500).json({
                    message: err.message
                })
            })
    }

    static updateNodeName = (req: any, res: Response, next: NextFunction) => {
        new NodeController(req.account, {}).editNodeName(req.params.node_id, req.body.node_name)
            .then(Res => {
                res.status(200).json(Res)
            }).catch(err => {
                res.status(err.status || 500).json({
                    message: err.message
                })
            })
    }

    static deleteNode = (req: Request, res: Response, next: NextFunction) => {
        new NodeController({}, {}).deleteNode(req?.params?.node_id)
            .then((Res: any) => {
                res.status(201).json(Res);
            })
            .catch((err: any) => {
                res.status(err.status || 500).json({
                    message: err.message,
                });
            });
    };

    static loginNode = (req: Request, res: Response, next: NextFunction) => {
        new NodeController({}, req.body)
            .loginNode()
            .then((Res) => {
                res.status(200).json(Res);
            })
            .catch((err) => {
                res.status(err.status || 500).json({
                    message: err.message,
                });
            });
    };

    static saveLog = (req: Request, res: Response, next: NextFunction) => {
        new NodeController({}, {}).saveLog(req.body.log, req.body.process, req.headers["Node"])
            .then((Res) => {
                res.status(201).json(Res);
            })
            .catch((err) => {
                res.status(err.status || 500).json({
                    message: err.message,
                });
            });
    };
}

export default NodeMiddleware;