import React from 'react';

import TodoCheckBox from '../TodoCheckBox';
import EditableText from '../EditableText';
import Button from '../Button';

import styles from './styles.css';


/**
* TodoItem
*/
class TodoItem extends React.Component {
  static propTypes = {
    todo: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  state = {
    editing: false,
  }

  onSave(newText) {
    if (newText.localeCompare(this.props.todo.get('text')) !== 0) {
      this.props.onSave(this.props.todo.set('text', newText));
    }
  }

  onDelete() {
    this.props.onDelete(this.props.todo.get('id'));
  }

  render() {
    const { todo } = this.props;

    const textField = (
      <EditableText
        ref={(c) => { this.textField = c; }}
        defaultClassName={styles.todoTextItem}
        activeClassName={styles.todoTextInput}
        onEditModeChange={(editing) => { this.setState({ editing }); }}
        onSave={this.onSave}
        value={todo.get('text')}
        editing={this.state.editing}
      />);
    const deleteButton = (
      <span onClick={this.onDelete}>Delete</span>
    );

    if (this.state.editing) {
      return (
        <div className={styles.todoItem}>
          <div className={styles.textBar}>
            {textField}
            {deleteButton}
          </div>
          <div className={styles.optionsBar}>
            <Button onClick={() => this.textField.save()}>Save</Button>
            <Button onClick={() => this.textField.cancel()}>Cancel</Button>
          </div>
        </div>
      );
    } else { // eslint-disable-line no-else-return
      return (
        <div className={styles.todoItem}>
          <div className={styles.textBar}>
            <TodoCheckBox className={styles.todoCheckbox} onClick={() => {}} />
            {textField}
            {deleteButton}
          </div>
        </div>
      );
    }
  }
}

export default TodoItem;
