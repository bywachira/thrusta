import mongoose, { Schema } from "mongoose";

export interface IProcess {
    process_id: string
    is_complete: boolean
    commands: any
    status?: string
    last_run?: string
    last_run_status?: string
    asleep?: boolean
    logs?: Array<any>
    developer: string
    process_name: string
}

interface processModelInterface extends mongoose.Model<ProcessDoc> {
    build(attr: IProcess): ProcessDoc
}

export interface ProcessDoc extends mongoose.Document {
    process_id: string
    is_complete: boolean
    commands?: Array<any>
    status?: string,
    last_run?: string
    last_run_status?: string
    asleep?: boolean
    logs?: Array<any>
    developer: string
    process_name: string
}

const processSchema = new mongoose.Schema(
    {
        process_id: {
            type: String,
            required: true,
        },
        is_complete: {
            type: Boolean,
            default: false,
        },
        commands: {
            type: [{ type: Schema.Types.ObjectId, ref: "Command" }]
        },
        status: {
            type: String,
            required: false,
            default: "dormant"
        },
        last_run: {
            type: String,
            default: ""
        },
        last_run_status: {
            type: String,
            default: ""
        },
        asleep: {
            type: Boolean,
            default: true
        },
        logs: {
            type: [{ type: Schema.Types.ObjectId, ref: "Log" }]
        },
        developer: {
            type: Schema.Types.ObjectId,
            ref: "Account"
        },
        process_name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

processSchema.statics.build = (attr: IProcess) => {
    return new Process(attr)
}

const Process = mongoose.model<ProcessDoc, processModelInterface>('Process', processSchema)

export default Process