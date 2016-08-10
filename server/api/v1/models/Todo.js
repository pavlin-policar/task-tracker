const mongoose = require('mongoose');
const restful = require('node-restful');
const uuid = require('node-uuid');


const TodoSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  text: String,
  dueDate: Date,
  urgency: Number,
  completed: Boolean,
  author: {
    type: String,
    ref: 'User',
  },
}, {
  timestamps: true,
});

module.exports = restful.model('Todo', TodoSchema);
