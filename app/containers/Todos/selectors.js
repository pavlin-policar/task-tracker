import { createSelector } from 'reselect';

/**
 * Direct selector to the todos state domain
 */
export const getTodosDomain = () => state => state.get('todos');

/**
 * Other specific selectors
 */

export const getListOfAllTodos = () => createSelector(
  getTodosDomain(),
  todos => todos.get('todos').map(id => todos.getIn(['todosById', id]))
);

/**
 * Default selector used by Todos
 */
export const getTodos = () => createSelector(
  getTodosDomain(),
  todos => todos.get('todosById')
);
export default getTodos;
