import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import TodoItem from '../TodoItem';

import styles from './styles.css';


/**
* TodoList
*/
const TodoList = ({ todos, onSave, onDelete }) => (
  <div className={styles.visibleTodoList}>
    <FormattedMessage {...messages.header} />
    {todos.map(todo => (
      <TodoItem
        key={todo.get('id')}
        todo={todo}
        onSave={onSave}
        onDelete={onDelete}
      />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

export default TodoList;
