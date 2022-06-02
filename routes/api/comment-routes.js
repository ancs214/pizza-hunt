const router = require('express').Router();
const { 
    addComment, 
    removeComment, 
    addReply, 
    removeReply 
} = require('../../controllers/comment-controller');

// POST comment   -   /api/comments/:pizzaId
router
.route('/:pizzaId')
.post(addComment);

// ADD reply or DELETE comment   -   /api/comments/:pizzaId/:commentId
router
.route('/:pizzaId/:commentId')
.put(addReply)
.delete(removeComment);

//DELETE reply   -   /api/comments/:pizzaId/:commentId/:replyId
// (best practices include parent resources in the endpoint)
router
.route('/:pizzaId/:commentId/:replyId')
.delete(removeReply)


module.exports = router;