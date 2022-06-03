const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//CREATE MONGOOSE SCHEMA
const PizzaSchema = new Schema({
  pizzaName: {
    type: String,
    required: 'You need to provide a pizza name!',
    trim: true
  },
  createdBy: {
    type: String,
    required: 'You need to provide a createdBy author!', 
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    //set GETTER to format data before it gets to the controller(s)
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  size: {
    type: String,
    required: true,
    //enum stands for enumerable; refers to a set of data that can be iterated over
    enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
    //do not create id virtual getter
    id: false
  }
);

// add virtual to get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
  //use reduce method to tally up the total of every comment with it's replies
  //Like .map(), the array prototype method .reduce() executes a function on each element in an array. However, unlike .map(), it uses the result of each function execution for each successive computation as it goes through the array. This makes it a perfect candidate for getting a sum of multiple values.
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;
