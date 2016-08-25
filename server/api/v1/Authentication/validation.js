import { isEmpty } from 'lodash';
import validator from 'validator';

import defaultdict from '../../../utils/defaultdict';


export const validateUser = (data) => {
  const {
    email,
    birthday,
    password,
    passwordConfirmation,
  } = data;

  const errors = defaultdict(Array);
  if (!validator.isEmail(email)) {
    errors.email.push('The email you have input is not a valid email.');
  }
  if (
    !(birthday instanceof Date) &&
    (birthday instanceof String && !validator.isDate(birthday))
  ) {
    errors.birthday.push('The date is not a valid date.');
  }
  if (!validator.isLength(password, 6)) {
    errors.password.push('The password you have provided is too short.');
  }
  if (!validator.matches(password, passwordConfirmation)) {
    errors.passwordConfirmation.push('The passwords you have provided do not match.');
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};
