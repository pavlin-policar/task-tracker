import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

import TextField from '../TextField';
import Button from '../Button';

import styles from './styles.css';


/**
* CreateTodoForm
*/
export default class CreateTodoForm extends React.Component {
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
