import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, required: true }, // No ref if you don't need population
    title: { type: String, required: true },
    content: String
});

const Post = mongoose.model('Post', postSchema);

export default Post;
