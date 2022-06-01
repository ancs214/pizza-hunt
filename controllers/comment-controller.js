const { Comment, Pizza } = require('../models');

const commentController = {
   
    //ADD COMMENT
    addComment({ params, body }, res) {
        console.log(body);
        //automatically creates an id
        Comment.create(body)
            //take the id and use $push method to add the id to the specific pizza we want to update
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                    //find single pizza with params argument
                    { _id: params.pizzaId },
                    //push the comment id onto the array
                    { $push: { comments: _id } },
                    //return updated pizza data
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    //DELETE COMMENT
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
          .then(deletedComment => {
            if (!deletedComment) {
              return res.status(404).json({ message: 'No comment with this id!' });
            }
            //this subdocument uses comment's id to remove it from the pizza
            return Pizza.findOneAndUpdate(
              { _id: params.pizzaId },
              { $pull: { comments: params.commentId } },
              //return updated pizza data
              { new: true }
            );
          })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
      }
      
};

module.exports = commentController;