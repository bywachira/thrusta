import http from "http";
import SocketServer from "websocket"
import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors from "cors"
import chalk from "chalk"
import mongoose from "mongoose"

import config from "./config"
import v1 from "./v1"
import NodeController from "./v1/controllers/node";
import * as ProcessController from "./v1/controllers/process";

mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on("open", (err) => {
    if (err) console.log(chalk.red(`[DATABASE] Error connecting to the database: [${err}]`))

    console.log(chalk.white("[DATABASE]: Connected successfully"))
})

const APP = express()

const WebSocketServer = SocketServer.server

const SERVER = http.createServer(APP)

APP.set("PORT", process.env.PORT || 5000)

APP.use(cors())

APP.use(bodyParser.json())

APP.use(bodyParser.urlencoded({ extended: true }))

APP.use(morgan("dev"))

APP.use("/api", v1)

SERVER.listen(APP.get("PORT"), () => {
    console.log(chalk.yellowBright(`[Server]: Running on PORT ${APP.get("PORT")}`))
})

const wsServer = new WebSocketServer({
    httpServer: SERVER,
});

wsServer.on("request", (request: SocketServer.request): any => {
    const connection = request.accept(undefined, request.origin)

    // connection.on("message", (message: SocketServer.IMessage) => {
    //     console.log("Received Message: ", message.utf8Data)

    //     connection.sendUTF("Hi this is a websocket server")
    // })

    connection.on("message", (data: any) => {
        const result = new NodeController({}, {}).verifyNode(data.token, data.node)

        result.then((res: any) => {
            ProcessController.fetchActiveProcesses(`${res.account}`).then((Res: any) => {
                connection.emit("payload", Res)
            })
        }).catch((err) => {
            console.log(`Problem connecting`)
        })
    })

    connection.on("close", (reasonCode: number, description: string) => {
        console.log(chalk.red(`[WS]: Client disconnected: \nReason Code: [${reasonCode}]\nDescription: [${description}]`))
    })
})
