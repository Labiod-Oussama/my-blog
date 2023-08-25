import mongoose from "mongoose";
const { Schema, Document } = mongoose;
interface CommentProp {
    userid: string;
    body: string;
    date: Date
}
interface IBlog extends Document {
    Title?: string,
    Date?: Date,
    Image?: string,
    Description?: string,
    Like?: string[],
    Type?: string,
    Commentaire?: CommentProp[]
}
const BlogSchema = new Schema<IBlog>({
    Title: {
        type: String
    },
    Date: {
        type: Date,
        default: Date.now
    },
    Image: {
        type: String
    },
    Description: {
        type: String
    },
    Type: {
        type: String
    },
    Like: {
        type: [String],
        default: []
    },
    Commentaire: [{
        userid: {
            type: Schema.Types.ObjectId,
            unique: false,
            ref: 'users',
            required: true
        },
        body: {
            type: String,
            default: ''
        },
    }]
});
const Blog = mongoose.model<IBlog>('blogs', BlogSchema);
export default Blog