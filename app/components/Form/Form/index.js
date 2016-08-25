import React from 'react';
import classNames from 'classnames';
import { has, mapValues, merge } from 'lodash';

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

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    formElements: {},
    data: {},
    errors: {},
  }

  componentWillMount() {
    this.associatedChildren = this.associate(this.props.children);
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
   */
  getDataFrom(formElements) {
    return {
      data: mapValues(formElements, (el) => el.getValue()),
    };
  }

  /**
   * Get the form data from any elements that contain the `name` attribute.
   */
  getData() {
    this.setState(merge(this.state, this.getDataFrom(this.state.formElements)));
    return this.state.data;
  }

  /**
   * Get any validation errors from tracked elements.
   */
  getErrors() {
    // TODO Implement this
    return {};
  }

  /**
   * If validations are specified, check if the data is valid.
   */
  isValid() {
    // TODO Implement this
    return true;
  }

  /**
   * Associate the original children with the form element to keep all the data
   * in one place.
   */
  associate(children) {
    return React.Children.map(children, (child) => React.cloneElement(child, {
      ref: (c) => {
        if (has(c, 'props.name')) {
          const { name } = c.props;
          this.setState(merge(this.state, { formElements: { [name]: c } }));
        }
      },
    }));
  }

  render() {
    return (
      <form
        className={classNames(styles.form, this.props.className)}
        onSubmit={this.onSubmit}
      >
        {this.associatedChildren}
      </form>
    );
  }
}

export default Form;
