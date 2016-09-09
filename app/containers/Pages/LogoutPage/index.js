import React from 'react';
import { connect } from 'react-redux';

import { logout } from 'containers/Authentication/actions';


class LogoutPage extends React.Component {
  static propTypes = {
    logout: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.logout();
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h1>You have logged out.</h1>
        </div>
        <div className="col-xs-12">
          <p>Come again soon!</p>
        </div>
      </div>
    );
  }
}

export default connect(null, { logout })(LogoutPage);
