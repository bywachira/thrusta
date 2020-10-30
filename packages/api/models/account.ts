import mongoose, { Schema } from "mongoose";

interface IAccount {
    email: string
    name: string
    is_verified?: boolean
    password: string
    role?: string
    has_password?: boolean,
    processes?: Array<any>
}

interface accountModelInterface extends mongoose.Model<AccountDoc> {
    build(attr: IAccount): AccountDoc
}

interface AccountDoc extends mongoose.Document {
    email: string
    name: string
    is_verified?: boolean
    password: string
    role?: string
    has_password?: boolean,
    processes?: Array<any>
}

const accountSchema = new mongoose.Schema(
    {
        email: {
            required: true,
            type: String,
        },
        name: {
            required: false,
            type: String,
            unique: true,
        },
        is_verified: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            default: "dev",
        },
        has_password: {
            type: Boolean,
            default: false
        },
        processes: {
            type: [{ type: Schema.Types.ObjectId, ref: "Process" }]
        }
    },
    {
        timestamps: true,
    }
);

accountSchema.statics.build = (attr: IAccount) => {
    return new Account(attr)
}

const Account = mongoose.model<AccountDoc, accountModelInterface>('Account', accountSchema)

export default Account