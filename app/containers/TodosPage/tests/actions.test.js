import expect from 'expect';

import * as Actions from '../actions';
import * as Constants from '../constants';


describe('Todos actions', () => {
  describe('Create todo action', () => {
    it('has a type of CREATE_TODO', () => {
      const expected = {
        type: Constants.CREATE_TODO,
      };
      expect(Actions.createTodo('Buy milk!')).toInclude(expected);
    });
  });

  describe('Delete todo action', () => {
    it('has a type of DELETE_TODO', () => {
      const expected = {
        type: Constants.DELETE_TODO,
      };
      expect(Actions.deleteTodo(1)).toInclude(expected);
    });
  });

  describe('Toggle todo action', () => {
    it('has a type of TOGGLE_TODO', () => {
      const expected = {
        type: Constants.TOGGLE_TODO,
      };
      expect(Actions.toggleTodo(1)).toInclude(expected);
    });
  });
});
