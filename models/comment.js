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
            type: String
        },
        writtenBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
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
        type: String
    },
    commentBody: {
        type: String
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
