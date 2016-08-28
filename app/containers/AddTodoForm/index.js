import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { createTodo } from 'containers/TodosPage/actions';

import TextField from 'containers/Form/components/TextField';
import Button from 'components/Button';

import styles from './styles.css';


/*
 * AddTodoForm
 */
class AddTodoForm extends React.Component {
  static propTypes = {
    onCreateTodo: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = this.input.getValue();
    if (text.length !== 0) {
      this.props.onCreateTodo(text);
      this.input.clear();
    }
  }

  render() {
    return (
      <div className={styles.createTodoForm}>
        <FormattedMessage {...messages.header} />
        <form onSubmit={this.handleSubmit}>
          <TextField
            ref={(c) => { this.input = c; }}
            placeholder="Buy milk!"
          />
          <Button type="submit"><FormattedMessage {...messages.createTodoButton} /></Button>
        </form>
      </div>
      );
  }
}

export default connect(null, { createTodo })(AddTodoForm);
