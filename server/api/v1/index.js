import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './models/User';
import Todo from './models/Todo';

import config from './config';


// Connect to mongodb
mongoose.connect('mongodb://localhost/todos');

// Create the router instance
const router = express.Router();

router.get('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ $or: [{ username }, { email: username }] }, (error, user) => {
    // If the users exists in database, check their credentials
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
          id: user.id,
        }, config.apiSecret);
        res.json({ token });
      } else {
        // Invalid password
        res.status(401).json({ error: 'INVALID_CREDENTIALS' });
      }
    } else {
      // No such user was found
      res.status(401).json({ error: 'INVALID_CREDENTIALS' });
    }
  });
});

// Register restful resources
User.methods(['get', 'post', 'put', 'delete']).register(router, '/users');
Todo.methods(['get', 'post', 'put', 'delete']).register(router, '/todos');

module.exports = router;
