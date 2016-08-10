const mongoose = require('mongoose');
const restful = require('node-restful');
const uuid = require('node-uuid');


const user = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  name: {
    first: String,
    last: String,
  },
  email: String,
  birthday: Date,
}, {
  timestamps: true,
});

module.exports = restful.model('User', user);
