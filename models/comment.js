const { Schema, model } = require('mongoose');

//CREATE SCHEMA
const CommentSchema = new Schema ({
    writtenBy: {
        type: toString
    },
    commentBody: {
        type: String 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
})

//CREATE MODEL USING SCHEMA
const Comment = model('Comment', CommentSchema);

//EXPORT
module.exports = Comment;
