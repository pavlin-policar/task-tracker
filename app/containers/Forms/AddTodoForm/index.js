import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import createForm from 'containers/Form/createForm';
import { createTodo } from 'containers/Todos/actions';

import TextField from 'containers/Form/components/TextField';
import Button from 'components/Button';

import messages from './messages';
import styles from './styles.css';


/*
 * AddTodoForm
 */
class AddTodoForm extends React.Component {
  static propTypes = {
    onCreateTodo: React.PropTypes.func.isRequired,
    values: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const value = this.props.values.get('text');
    if (value !== '') {
      // console.log(value);
      // this.props.onCreateTodo(value);
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className={styles.createTodoForm}>
        <form onSubmit={handleSubmit}>
          <TextField name="text" placeholder="Buy milk!" validate="required" />
          <Button type="submit"><FormattedMessage {...messages.createTodoButton} /></Button>
        </form>
      </div>
      );
  }
}

AddTodoForm = createForm({ // eslint-disable-line no-class-assign
  id: 'addTodo',
})(AddTodoForm);

export default connect(null, { createTodo })(AddTodoForm);
