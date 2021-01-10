import mongoose, { Schema } from "mongoose";

export interface INode {
    node_id: string
    account: string
    active: boolean,
    node_name?: string;
}

interface nodeModelInterface extends mongoose.Model<NodeDoc> {
    build(attr: INode): NodeDoc
}

export interface NodeDoc extends mongoose.Document {
    node_id: string
    account: string
    active: string
    node_name?: string;
}

const nodeSchema = new mongoose.Schema(
    {
        node_id: {
            type: String,
            required: true,
        },
        account: {
            type: Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },
        node_name: {
            type: String,
            required: false
        },
        active: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

nodeSchema.statics.build = (attr: INode) => {
    return new Node(attr)
}

const Node = mongoose.model<NodeDoc, nodeModelInterface>('Node', nodeSchema)

export default Node
