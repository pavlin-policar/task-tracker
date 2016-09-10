import React from 'react';
import classNames from 'classnames';

import Header from 'components/Header';

import styles from './styles.css';


export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div className={styles.app}>
        <Header />
        <div className={classNames('container-fluid', 'wrap')}>
          {React.Children.toArray(this.props.children)}
        </div>
      </div>
    );
  }
}
