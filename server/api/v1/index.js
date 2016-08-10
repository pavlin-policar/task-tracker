const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/User');
const Todo = require('./models/Todo');


// Connect to mongodb
mongoose.connect('mongodb://localhost/todos');

// Create the router instance
const router = express.Router();

// Register restful resources
User.methods(['get', 'post', 'put', 'delete']).register(router, '/users');
Todo.methods(['get', 'post', 'put', 'delete']).register(router, '/todos');

module.exports = router;
