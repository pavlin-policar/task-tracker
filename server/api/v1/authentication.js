import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { isEmpty } from 'lodash';

import config from './config';

import User from './models/User';


const router = Router();

const SALT_ROUNDS = 10;

function validateUser({
  email,
  birthday,
  password,
  passwordConfirmation,
}) {
  const errors = {};
  if (!validator.isEmail(email)) {
    errors.email = 'EMAIL_INVALID_FORMAT';
  }
  if (!(birthday instanceof Date) || !validator.isDate(birthday)) {
    errors.birthday = 'DATE_INVALID_FORMAT';
  }
  if (!validator.isLength(password, 6)) {
    errors.password = 'PASSWORD_TOO_SHORT';
  }
  if (!validator.matches(password, passwordConfirmation)) {
    errors.passwordConfirmation = 'PASSWORD_NO_MATCH';
  }
}

router.post('/register', (req, res) => {
  const {
    name,
    surname,
    email,
    birthday,
    password,
  } = req.body;

  const errors = validateUser(req.body);
  if (isEmpty(errors)) {
    User.findOne({ email }, (findUserError, user) => {
      if (findUserError) {
        // Database error when checking if user exists
        res.status(500).json({ error: 'INTERNAL_ERROR' });
      } else if (user) {
        // User with email already exists
        res.status(400).json({ error: 'USER_EXISTS' });
      } else {
        // The user is indeed a new user, proceed with registration
        const passwordDigest = bcrypt.hashSync(password, SALT_ROUNDS);
        new User({
          name,
          surname,
          email,
          birthday,
          password: passwordDigest,
        }).save((saveUserError) => {
          if (saveUserError) {
            res.status(500).json({ error: 'INTERNAL_ERROR' });
          } else {
            res.json({ success: 'SUCCESS' });
          }
        });
      }
    });
  } else {
    // Something went wrong with validations
    res.json({ errors });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (error, user) => {
    // If the users exists in database, check their credentials
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
          id: user.id,
        }, config.appSecret);
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

export default router;
