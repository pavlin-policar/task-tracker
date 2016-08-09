import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import TodoItem from '../TodoItem';

import styles from './styles.css';


/**
* TodoList
*/
const TodoList = (props) => (
  <div className={styles.visibleTodoList}>
    <FormattedMessage {...messages.header} />
    {props.todos.map(todo => <TodoItem key={todo.get('id')} todo={todo} />)}
  </div>
);

TodoList.propTypes = {
  todos: React.PropTypes.object.isRequired,
};

export default TodoList;
