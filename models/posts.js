const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  link: String,
  age: Number,
  company: String,
  pay: String,
  tags: String,
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;