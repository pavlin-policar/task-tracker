import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class NotFound extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <p><FormattedMessage {...messages.helpText} /></p>
      </div>
    );
  }
}
