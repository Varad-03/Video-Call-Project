import mongoose , { Schema } from "mongoose";

const meetingSchema = new Schema(
    {
        user_id: { type: Sting },
        mettingCode: { type: Sting , required: true },
        date: { type: Date , default: Date.now , required: true }
    }
)

const Meeting = mongoose.model("Meeting" , meetingSchema);

export { Meeting };