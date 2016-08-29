import expect from 'expect';

import * as actions from '../actions';
import * as constants from '../constants';


describe('Todos actions', () => {
  describe('Creating a todo', () => {
    describe('createTodo', () => {
      it('has a type of CREATE_TODO_REQUEST', () => {
        const expected = {
          type: constants.CREATE_TODO_REQUEST,
        };
        expect(actions.createTodo({ text: 'Buy milk!' })).toInclude(expected);
      });

      it('normalizes the created todo', () => {
        const { payload } = actions.createTodo({ text: 'Buy milk!' });
        expect(payload).toIncludeKeys(['result', 'entities']);
        expect(
          payload.entities.todos[payload.result]
        ).toInclude(
          { text: 'Buy milk!' }
        );
      });
    });

    describe('receiveCreatedTodo', () => {
      it('has a type of CREATE_TODO_SUCCESS', () => {
        const expected = {
          type: constants.CREATE_TODO_SUCCESS,
        };
        expect(
          actions.receiveCreatedTodo({ id: 1, text: 'Buy milk!' })
        ).toInclude(expected);
      });
    });

    describe('failedCreatingTodo', () => {
      it('has a type of CREATE_TODO_FAILURE', () => {
        const expected = {
          type: constants.CREATE_TODO_FAILURE,
        };
        expect(actions.failedCreatingTodo()).toInclude(expected);
      });
    });
  });

  describe('Delete todo action', () => {
    describe('deleteTodo', () => {
      it('has a type of DELETE_TODO_REQUEST', () => {
        const expected = {
          type: constants.DELETE_TODO_REQUEST,
        };
        expect(actions.deleteTodo(1)).toInclude(expected);
      });
    });
  });
});
