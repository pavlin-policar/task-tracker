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
    label: React.PropTypes.string,
    type: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    validate: React.PropTypes.string,
    helpText: React.PropTypes.string,
    errors: React.PropTypes.object,
    touched: React.PropTypes.bool,
  }

  static defaultProps = {
    errors: List(),
  }

  render() {
    const { label, helpText, errors, touched } = this.props;

    const errorsMessages = errors.map((error) => (
      <span key={error} className={styles.errorText}>
        <FormattedMessage {...messages[error]} />
      </span>
    ));

    return (
      <div
        className={classNames({
          [styles.formElement]: true,
          [styles.error]: (errors.size > 0) && touched,
        })}
      >
        {label ? (
          <label
            className={styles.label}
            htmlFor={(this.input && this.input.props.name) || ''}
          >
            {label}
          </label>
        ) : null}
        <this.props.type
          className={styles.input}
          name={this.props.name}
          placeholder={this.props.placeholder}
          validate={this.props.validate}
        />
        {helpText ? (<span className={styles.helpText}>{helpText}</span>) : null}
        {touched ? errorsMessages : null}
      </div>
    );
  }
}

export default FormElement;
