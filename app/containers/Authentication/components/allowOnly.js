import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  getUser,
} from '../selectors';

const wrapper = (options) => (Component) => class extends React.Component {
  static displayName = `allowOnly(${Component.displayName})`;

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.shouldRenderComponent = this.shouldRenderComponent.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentWillMount() { if (!this.shouldRenderComponent()) this.redirect(); }
  componentWillUpdate() { if (!this.shouldRenderComponent()) this.redirect(); }

  shouldRenderComponent() {
    const { user } = this.props;

    let rolesAllowed = [];
    if (typeof options === 'number') {
      rolesAllowed = [options];
    } else if (options instanceof Array) {
      rolesAllowed = options;
    }

    return rolesAllowed.includes(user.get('role'));
  }

  redirect() {
    // Save the intended path to the store for later use.

    // Show the 401 page.
    this.props.router.push('/401');
  }

  render() {
    return React.Children.only(<Component {...this.props} />);
  }
};

const allowOnly = (...options) => (...params) => {
  const mapStateToProps = (state) => ({
    user: getUser()(state),
  });
  return withRouter(connect(mapStateToProps)(wrapper(...options)(...params)));
};

export default allowOnly;
