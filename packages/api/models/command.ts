import mongoose, { Schema } from "mongoose";

interface ICommand {
    command: string
    process?: string | any
    account: string
}

interface commandModelInterface extends mongoose.Model<CommandDoc> {
    built(attr: ICommand): CommandDoc
}

export interface CommandDoc extends mongoose.Document {
    command: string
    process?: string | any
    command_id: string
}

const commandSchema = new mongoose.Schema(
    {
        command: {
            type: String,
            required: true,
        },
        process: {
            type: Schema.Types.ObjectId,
            ref: "Process"
        },
        command_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

commandSchema.statics.build = (attr: ICommand) => {
    return new Command(attr)
}

const Command = mongoose.model<CommandDoc, commandModelInterface>("Command", commandSchema)

export default Command