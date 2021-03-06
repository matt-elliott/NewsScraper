const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  link: String,
  age: String,
  company: String,
  pay: String,
  tags: String,
  comments: {
    type: String,
    ref: "Comments"
  }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;