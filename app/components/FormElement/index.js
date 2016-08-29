import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { List } from 'immutable';

import messages from './messages';

import styles from './styles.css';


/**
* FormElement
*/
class FormElement extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    inputComponent: React.PropTypes.element.isRequired,
    helpText: React.PropTypes.string,
    errors: React.PropTypes.object,
  }

  static defaultProps = {
    errors: List(),
  }

  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
  }

  componentWillMount() {
    this.inputComponent = React.cloneElement(this.props.inputComponent, {
      ref: (c) => { this.input = c; },
      className: styles.input,
      onBlur: this.onBlur,
    });
  }

  onBlur() {
  }

  render() {
    const { label, helpText, errors } = this.props;

    let errorsMessages = [];
    errors.forEach((error) => {
      errorsMessages.push(
        <span key={error} className={styles.errorText}>
          <FormattedMessage {...messages[error]} />
        </span>
      );
    });

    return (
      <div
        className={classNames({
          [styles.formElement]: true,
          [styles.error]: errors.size > 0,
        })}
      >
        <label
          className={styles.label}
          htmlFor={(this.input && this.input.props.name) || ''}
        >
          {label}
        </label>
        {this.inputComponent}
        {helpText ? (<span className={styles.helpText}>{helpText}</span>) : null}
        {errorsMessages}
      </div>
    );
  }
}

export default FormElement;
