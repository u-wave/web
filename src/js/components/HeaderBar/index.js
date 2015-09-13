import assign from 'object-assign';
import cx from 'classnames';
import React from 'react';
import styles from './style.css';

export default class HeaderBar extends React.Component {
  render() {
    let props = assign({}, this.props, {
      className: cx(styles['header-bar'], this.props.className)
    });
    return (
      <div {...props}>
        <h1 className={styles.title}>üwave</h1>
      </div>
    );
  }
}
