import mongoose, { Schema } from "mongoose";

interface ICredit {
    credits: number,
    account: string
}

interface creditModelInterface extends mongoose.Model<CreditDoc> {
    build(attr: ICredit): CreditDoc
}

interface CreditDoc extends mongoose.Document {
    credits: number
    account: string
}

const creditSchema = new mongoose.Schema({
    credits: {
        type: Number,
        required: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    }
}, {
    timestamps: true
})

creditSchema.statics.build = (attr: ICredit) => {
    return new Credit(attr)
}

const Credit = mongoose.model<CreditDoc, creditModelInterface>("Credit", creditSchema)

export default Credit
