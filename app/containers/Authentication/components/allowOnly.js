import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { ROLES } from '../index';
import {
  getUser,
  getIntendedLocation,
} from '../selectors';
import {
  redirectFromUnauthorized,
  redirectToIntended,
} from '../actions';

const wrapper = (options) => (Component) => class extends React.Component {
  static displayName = `allowOnly(${Component.displayName})`;

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    redirectToIntended: React.PropTypes.func.isRequired,
    location: React.PropTypes.object,
    redirectFromUnauthorized: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.redirect = this.redirect.bind(this);
  }

  componentWillMount() {
    if (!this.shouldRenderComponent(this.props)) this.redirect();
  }
  componentWillUpdate(nextProps) {
    if (!this.shouldRenderComponent(nextProps)) this.redirect();
  }

  shouldRenderComponent({ user }) {
    let rolesAllowed = [];
    if (typeof options === 'number') {
      rolesAllowed = [options];
    } else if (options instanceof Array) {
      rolesAllowed = options;
    }

    return rolesAllowed.includes(user.get('role'));
  }

  redirect() {
    const intendedLocation = this.props.location;
    // Save the intended path to the store for later use.
    this.props.redirectFromUnauthorized({ intendedLocation });
    if (this.props.user.get('role') === ROLES.GUEST) {
      // If its a guest, prompt for login
      this.props.router.push('/login');
    } else {
      // Show the 401 page
      this.props.router.push('/401');
    }
  }

  render() {
    return React.Children.only(<Component {...this.props} />);
  }
};

const allowOnly = (...options) => (...params) => {
  const mapStateToProps = (state) => ({
    user: getUser()(state),
    intendedLocation: getIntendedLocation()(state),
  });
  const mapDispatchToProps = {
    redirectFromUnauthorized,
    redirectToIntended,
  };
  const wrappers = [
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
  ];
  return wrappers.reduce(
    (previous, fn) => fn(previous),
    wrapper(...options)(...params)
  );
};

export default allowOnly;
