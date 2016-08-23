import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import * as constants from './constants';


/*
 * LoginContainer reducer
 */
const initialState = fromJS({});

const loginFormreducer = handleActions({
  [constants.DEFAULT_ACTION](state, action) {
    return state;
  },
}, initialState);

export default loginFormreducer;
