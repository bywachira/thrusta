import mongoose, { Schema } from "mongoose";

interface IActivity {
    type: string
    description: string
    account: string
}

interface activityModelInterface extends mongoose.Model<ActivityDoc> {
    built(attr: IActivity): ActivityDoc
}

interface ActivityDoc extends mongoose.Document {
    type: string
    description: string
    account: string
}

const activitySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        description: {
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

activitySchema.statics.build = (attr: IActivity) => {
    return new Activity(attr)
}

const Activity = mongoose.model<ActivityDoc, activityModelInterface>("Activity", activitySchema)

export default Activity