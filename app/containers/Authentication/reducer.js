import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import * as constants from './constants';


/*
 * Authentication reducer
 */
const initialState = fromJS({});

const loginFormreducer = handleActions({
  [constants.LOGIN_REQUEST](state) {
    return state;
  },
}, initialState);

export default loginFormreducer;
