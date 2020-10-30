import express from "express";
import authAPI from "./routes/authentication";
import nodeAPI from "./routes/node";
import processAPI from "./routes/process";

const v1 = express.Router();

v1.use("/v1", authAPI);
v1.use("/v1", nodeAPI);
v1.use("/v1", processAPI);

export default v1;