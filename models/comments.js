const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CommentShema = new Schema({
  comment: {
    type: String,
    required: true
  }
});

const Comment = mongoose.model('Comment', CommentShema);

module.exports = Comment;