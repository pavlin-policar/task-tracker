import React from 'react';
import { connect } from 'react-redux';

import { getListOfAllTodos } from 'containers/Todos/selectors';
import {
  createTodo,
  fetchTodos,
  updateTodo,
  deleteTodo,
} from 'containers/Todos/actions';

import AddTodoForm from 'containers/Forms/AddTodoForm';
import TodoList from 'components/TodoList';


class TodosPage extends React.Component {
  static propTypes = {
    todos: React.PropTypes.object.isRequired,
    createTodo: React.PropTypes.func.isRequired,
    fetchTodos: React.PropTypes.func.isRequired,
    updateTodo: React.PropTypes.func.isRequired,
    deleteTodo: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 right">
          <span onClick={() => this.props.fetchTodos()}>Refresh</span>
        </div>
        <div className="col-xs-12">
          <AddTodoForm
            onCreateTodo={(value) => this.props.createTodo({ text: value })}
          />
        </div>
        <div className="col-xs-12">
          <TodoList
            todos={this.props.todos}
            onSave={this.props.updateTodo}
            onDelete={this.props.deleteTodo}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: getListOfAllTodos()(state),
});
const mapDispatchToProps = {
  createTodo,
  fetchTodos,
  updateTodo,
  deleteTodo,
};
export default connect(mapStateToProps, mapDispatchToProps)(TodosPage);
