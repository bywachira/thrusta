import mongoose, { Schema } from "mongoose";

interface ILog {
    log: string
    process: string
    node: string
    type: string
}

interface logModelInterface extends mongoose.Model<LogDoc> {
    build(attr: ILog): LogDoc
}

interface LogDoc extends mongoose.Document {
    log: string
    process: string
    node: string,
    type: string
}

const logSchema = new mongoose.Schema(
    {
        log: {
            type: String,
            required: true,
        },
        process: {
            type: Schema.Types.ObjectId,
            ref: "Process",
            required: true,
        },
        node: {
            type: Schema.Types.ObjectId,
            ref: "Node",
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

logSchema.statics.build = (attr: ILog) => {
    return new Log(attr)
}

const Log = mongoose.model<LogDoc, logModelInterface>('Log', logSchema)

export default Log