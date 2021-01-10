import express from "express";
import NodeMiddleware from "../middleware/node";
import Checkers from "../middleware/checkers";

const router = express.Router();

router.get(
    "/nodes",
    Checkers.isLogggedin,
    Checkers.hasPassword,
    Checkers.isVerified,
    NodeMiddleware.fetchAllNodes
);

router.delete(
    "/nodes/:node_id",
    Checkers.isLogggedin,
    Checkers.hasPassword,
    Checkers.isVerified,
    NodeMiddleware.deleteNode
);

router.post(
    "/login/node",
    NodeMiddleware.loginNode
);

router.post(
    "/save-log",
    Checkers.isLogggedin,
    Checkers.hasPassword,
    Checkers.isVerified,
    NodeMiddleware.saveLog
);

router.patch("/node-name/:node_id", Checkers.isLogggedin, Checkers.hasPassword, Checkers.isVerified, NodeMiddleware.updateNodeName)

router.get("/nodes/:node_id", Checkers.isLogggedin, Checkers.hasPassword, Checkers.isVerified, NodeMiddleware.getNode)

export default router;