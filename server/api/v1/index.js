import express from 'express';
import mongoose from 'mongoose';

import authentication from './authentication';

import Todo from './models/Todo';


// Connect to mongodb
mongoose.connect('mongodb://localhost/todos');

// Create the router instance
const router = express.Router();

router.use('/auth', authentication);

// Register restful resources
Todo.methods(['get', 'post', 'put', 'delete']).register(router, '/todos');

export default router;
