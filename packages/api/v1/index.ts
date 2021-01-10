import express from "express";
import authAPI from "./routes/authentication";
import nodeAPI from "./routes/node";
import processAPI from "./routes/process";
import monitorAPI from "./routes/monitor";

const v1 = express.Router();

v1.use("/v1", authAPI);
v1.use("/v1", nodeAPI);
v1.use("/v1", processAPI);
v1.use("/v1", monitorAPI);

export default v1;