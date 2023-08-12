import mongoose from "mongoose";
const { Schema, Document } = mongoose;
interface ILike extends Document {
    IdUser?: string,
    IdBlog?: string[]
}
const likeSchema = new Schema<ILike>({
    IdUser: {
        type: String
    },
    IdBlog: {
        type: [String]
    }
})
const Like = mongoose.model('likes', likeSchema);
export default Like