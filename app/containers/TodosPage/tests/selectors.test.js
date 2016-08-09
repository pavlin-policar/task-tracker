import expect from 'expect';
import { List } from 'immutable';

import todos from '../reducer';
import * as actions from '../actions';
import {
  getTodosDomain,
  getTodos,
  getListOfAllTodos,
} from '../selectors';


// Set up the state on which we will be testing
let state = todos(undefined, {});
state = todos(state, actions.createTodo('Buy milk!'));
state = todos(state, actions.createTodo('Find Nemo!'));

// Tests
describe('The getTodosDomain selector', () => {
  it('should return the todos domain', () => {
    const expectedResult = state.get('todos');
    expect(getTodosDomain()(state)).toEqual(expectedResult);
  });
});


describe('The getTodos selector', () => {
  it('should return a map of all the todos', () => {
    const expectedResult = state.getIn(['todos', 'todosById']);
    expect(getTodos()(state)).toEqual(expectedResult);
  });
});

describe('The getListOfAllTodos selector', () => {
  it('should return an array of all the todos', () => {
    const result = getListOfAllTodos()(state);
    expect(result).toBeA(List);
    expect(result.size).toBe(2);
  });
});
