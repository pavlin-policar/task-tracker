import expect from 'expect';

import todosReducer from '../reducer';


describe('The todos reducer', () => {
  describe('the initial state', () => {
    it('contains an empty list of todos', () => {
      const state = todosReducer(undefined, {});
      expect(state.has('todos')).toBe(true);
      expect(state.get('todos').isEmpty()).toBe(true);
    });
  });

  describe('creating todos', () => {
    it('should create a todo', () => {});
  });
});
