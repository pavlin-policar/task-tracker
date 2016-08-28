import React from 'react';
import { FormattedMessage } from 'react-intl';

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

    return (
      <div className={styles.formElement}>
        <label
          className={styles.label}
          htmlFor={(this.input && this.input.props.name) || ''}
        >
          {label}
        </label>
        {this.inputComponent}
        {helpText ? (<span className={styles.helpText}>{helpText}</span>) : null}
        {(errors || []).map((error) => (<FormattedMessage key={error} {...messages[error]} />))}
      </div>
    );
  }
}

export default FormElement;
