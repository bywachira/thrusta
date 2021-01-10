import mongoose, { Schema } from "mongoose";

export interface ICPU {
    cpu_usage: number;
    cpu_total: number;
    cpu_idle: number;
}

export interface IMemory {
    memory_total: number;
    memory_used: number;
    memory_cached: number;
    memory_free: number;
}

export interface INetwork {
    name: string;
    receive: number;
    transmit: number;
}

export interface IDisk {
    name: string;
    reads: number;
    writes: number;
}

export interface IServerData {
    node: string;
    cpu: ICPU;
    memory: IMemory;
    network: INetwork[];
    disk: IDisk[];
    last_ping: string;
    uptime: string;
}

interface monitorModelInterface extends mongoose.Model<MonitorDoc> {
    build(attr: IServerData): MonitorDoc
}

export interface MonitorDoc extends mongoose.Document, IServerData { }

const monitorSchema = new mongoose.Schema({
    node: {
        type: Schema.Types.ObjectId,
        ref: "Node",
        required: true
    },
    cpu: {
        type: Object,
        required: false,
    },
    memory: {
        type: Object,
        required: false,
    },
    network: {
        type: Array,
        required: false
    },
    disk: {
        type: Array,
        required: false
    },
    last_ping: {
        type: String,
        default: new Date().toISOString()
    },
    uptime: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

monitorSchema.statics.build = (attr: IServerData) => {
    return new Monitor(attr)
}

const Monitor = mongoose.model<MonitorDoc, monitorModelInterface>("Monitor", monitorSchema);

export default Monitor
