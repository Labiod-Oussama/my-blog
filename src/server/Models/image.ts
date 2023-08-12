import mongoose from "mongoose";
const { Schema, Document } = mongoose;

interface IBlog extends Document {
    userid: string,
    image: string,
    Date?: Date,

}
const BlogSchema = new Schema<IBlog>({
    userid: {
        type: String,
    },
    image: {
        type: String
    },
    Date: {
        type: Date,
        default: Date.now
    }
});
const image = mongoose.model<IBlog>('image', BlogSchema);
export default image