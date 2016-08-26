import React from 'react';
import classNames from 'classnames';
import { mapValues, merge, isEmpty, pickBy } from 'lodash';

import styles from './styles.css';


/**
* Form
*/
class Form extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
  }

  static childContextTypes = {
    registerWithForm: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    formElements: {},
    data: {},
    errors: {},
  }

  getChildContext() {
    return {
      registerWithForm: (c) => {
        this.setState(merge(this.state, { formElements: { [c.props.name]: c } }));
      },
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.getData());
  }

  /**
   * Get all data from child input components.
   *
   * @param formElements Elements that have the `getValue` method to retrieve
   *   value.
   * @private
   */
  getDataFrom(formElements) {
    return {
      data: mapValues(formElements, (el) => el.getValue()),
    };
  }

  /**
   * Get the form data from any elements that contain the `name` attribute.
   *
   * @public
   */
  getData() {
    this.setState(merge(this.state, this.getDataFrom(this.state.formElements)));
    return this.state.data;
  }

  /**
   * Get any validation errors from tracked elements.
   *
   * @public
   */
  getErrors() {
    return pickBy(
      mapValues(this.state.formElements, (el) => el.getErrors()),
      (err) => !isEmpty(err)
    );
  }

  /**
   * If validations are specified, check if the data is valid.
   *
   * @public
   */
  isValid() {
    return isEmpty(this.getErrors());
  }

  render() {
    return (
      <form
        className={classNames(styles.form, this.props.className)}
        onSubmit={this.onSubmit}
      >
        {this.props.children}
      </form>
    );
  }
}

export default Form;
