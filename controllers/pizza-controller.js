const { Pizza } = require('../models');

//CREATING OBJECT WITH ROUTE METHODS
const pizzaController = {

  // const dogObject = {
  //     bark: function() {
  //       console.log('Woof!');
  //     }


  //IS THE SAME AS:
  // bark() {
  //     console.log('Woof!');
  //   }
  // }


  // get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      //populate with the comments model also
      .populate({
        path: 'comments',
        //do not include the comment's __v field
        select: '-__v'
      })
      //do not include pizza's __v field
      .select('-__v')
      //sort in DESC order by id value
      .sort({ _id: -1 })
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id  --->  GET /api/pizzas
  // Instead of accessing the entire req, we've destructured params out of it, because that's the only data we need for this request
  getPizzaById({ params }, res) {
    //shorthand to set _id to equal params.id
    Pizza.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbPizzaData => {
        // If no pizza is found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createPizza  --->   POST /api/pizzas
  // destructure the body out of the Express.js req object because we don't need to interface with any of the other data it provides
  createPizza({ body }, res) {
    //similar to sequelize, mongoose uses .create() to create data
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },

  // update pizza by id  --->   PUT /api/pizzas/:id
  // With Mongoose, the "where" clause is used first, then the updated data, then options for how the data should be returned.
  updatePizza({ params, body }, res) {
    //setting new: true will return the updated document. if we dont set, it will return the original document instead
    //runValidators will run validators we have set on the new information being put in
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },

  //DELETE/api/pizzas/:id
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }

}




module.exports = pizzaController;
