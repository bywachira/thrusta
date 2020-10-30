import mongoose, { Schema } from "mongoose";

interface ICommands {
    name: string
    account: string
}

interface commandsModelInterface extends mongoose.Model<CommandsDoc> {
    built(attr: ICommands): CommandsDoc
}

interface CommandsDoc extends mongoose.Document {
    name: string
    account: string
}

const commands_holder = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        account: {
            type: Schema.Types.ObjectId,
            ref: "Account",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

commands_holder.statics.build = (attr: ICommands) => {
    return new Commands(attr)
}

const Commands = mongoose.model<CommandsDoc, commandsModelInterface>("CommandList", commands_holder)

export default Commands