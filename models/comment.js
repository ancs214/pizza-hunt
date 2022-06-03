const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//CREATE REPLY SCHEMA
const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String,
            required: 'You must submit a reply',
            trim: true
        },
        writtenBy: {
            type: String,
            required: 'You must submit a writtenBy author',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        
        _id: false
    },

    {
        toJSON: {
            getters: true
        }
    }
);

//CREATE COMMENT SCHEMA
const CommentSchema = new Schema({
    writtenBy: {
        type: String,
        required: 'You must submit a writtenBy author',
        trim: true
    },
    commentBody: {
        type: String,
        required: 'You must submit a comment',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    //associate replies with comments
    replies: [ReplySchema]
},

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
            //do not create id virtual getter
            id: false
    }
);

//add virtual to get total count of replies
CommentSchema.virtual('replyCount').get(function () {
    return this.replies.length;
});

//CREATE MODEL USING SCHEMA
const Comment = model('Comment', CommentSchema);

//EXPORT
module.exports = Comment;
