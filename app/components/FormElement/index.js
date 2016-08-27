import React from 'react';

import styles from './styles.css';


/**
* FormElement
*/
class FormElement extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    inputComponent: React.PropTypes.element.isRequired,
    helpText: React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
  }

  state = {
    errors: [],
  }

  componentWillMount() {
    this.inputComponent = React.cloneElement(this.props.inputComponent, {
      ref: (c) => { this.input = c; },
      className: styles.input,
      onBlur: this.onBlur,
    });
  }

  onBlur() {
    // this.setState({ errors: this.input.getErrors() });
  }

  render() {
    const { label, helpText } = this.props;

    const errors = this.state.errors.map((err) => (<span key={err}>{err}</span>));
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
        {errors}
      </div>
    );
  }
}

export default FormElement;
