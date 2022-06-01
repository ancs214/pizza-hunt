const { Schema, model } = require('mongoose');

//CREATE MONGOOSE SCHEMA
const PizzaSchema = new Schema({
  pizzaName: {
    type: String
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  size: {
    type: String,
    default: 'Large'
  },
  // [] indicates an array as the data type
  toppings: [],
  comments: [
    {
      //we need to tell Mongoose to expect ObjectId and that the data comes from the Comment model
      type: Schema.Types.ObjectId,
      //ref tells the Pizza model which doc to search to find the right comments
      ref: 'Comment'
    }
  ]
},
  //tell schema to use virtuals
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;
