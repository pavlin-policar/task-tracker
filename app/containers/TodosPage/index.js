import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { getListOfAllTodos } from './selectors';
import {
  fetchTodos,
  createTodo,
} from './actions';

import CreateTodoForm from 'components/CreateTodoForm';
import TodoList from 'components/TodoList';

import styles from './styles.css';


/*
 * Todos
 */
export class Todos extends React.Component {
  static propTypes = {
    createTodo: React.PropTypes.func.isRequired,
    fetchTodos: React.PropTypes.func.isRequired,
    todos: React.PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    return (
      <div className={styles.todos}>
        <FormattedMessage {...messages.header} />
        <span onClick={() => this.props.fetchTodos()}>Refresh</span>
        <CreateTodoForm
          onCreateTodo={(value) => this.props.createTodo({ text: value })}
        />
        <TodoList todos={this.props.todos} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: getListOfAllTodos()(state),
});
const mapDispatchToProps = { createTodo, fetchTodos };

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
