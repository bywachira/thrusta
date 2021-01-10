import express from "express";
import MonitorMiddleware from "../middleware/monitor";
import Checkers from "../middleware/checkers";

const router = express.Router()

router.get("/monitoring/:node_id", Checkers.isLogggedin, Checkers.hasPassword, Checkers.isVerified, MonitorMiddleware.getMonitors)

router.post("/monitoring/:node_id", Checkers.isLogggedin, Checkers.hasPassword, Checkers.isVerified, MonitorMiddleware.createMonitor)

router.get("/monitoring/latest/:node_id", Checkers.isLogggedin, Checkers.hasPassword, Checkers.isVerified, MonitorMiddleware.getLatestMonitorData)

export default router;