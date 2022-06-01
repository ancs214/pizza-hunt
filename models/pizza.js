const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
    default: Date.now,
    //set GETTER to format data before it gets to the controller(s)
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  size: {
    type: String,
    default: 'Large'
  },
  // [] indicates an array as the data type
  toppings: [],
  //When you add data into a nested array of a MongoDB document, they become what's known as a "nested document" or "subdocument"
  comments: [
    {
      //we need to tell Mongoose to expect ObjectId and that the data comes from the Comment model - create new objectid instance?
      type: Schema.Types.ObjectId,
      //ref tells the Pizza model which doc to search to find the right comments
      ref: 'Comment'
    }
  ]
},

  {
    toJSON: {
      //tell schema to use virtuals and getters
      virtuals: true,
      getters: true
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
