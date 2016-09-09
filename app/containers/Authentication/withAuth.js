import React from 'react';
import { connect } from 'react-redux';

import {
  getIsLoggedIn,
} from './selectors';


export const authWrapper = (Component) => class extends React.Component {
  static displayName = `withAuth(${Component.displayName})`;

  static propTypes = {
    isLoggedIn: React.PropTypes.bool.isRequired,
  }

  render() { return React.Children.only(<Component {...this.props} />); }
};

const withAuth = (...params) => {
  const mapStateToProps = (state) => ({
    isLoggedIn: getIsLoggedIn()(state),
  });
  return connect(mapStateToProps)(authWrapper(...params));
};

export default withAuth;
