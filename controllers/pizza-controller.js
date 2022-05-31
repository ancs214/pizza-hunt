const { Pizza } = require('../models');

//CREATING OBJECT
const pizzaController = {

    //THESE ARE OBJECT METHODS

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
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one pizza by id  ---  GET /api/pizzas
    // Instead of accessing the entire req, we've destructured params out of it, because that's the only data we need for this request
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
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

    // createPizza  ---   POST /api/pizzas
    // destructure the body out of the Express.js req object because we don't need to interface with any of the other data it provides
    createPizza({ body }, res) {
        //similar to sequelize, mongoose uses .create() to create data
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // update pizza by id  ---   PUT /api/pizzas/:id
updatePizza({ params, body }, res) {
    //setting new: true will return the updated document. if we dont set, it will return the original document instead
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
