import React from 'react';

import styles from './styles.css';


/**
* TodoItem
*/
const TodoItem = ({ todo }) => (
  <div className={styles.todoItem}>
    <span>{todo.get('text')}</span>
  </div>
);

TodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
};

export default TodoItem;
