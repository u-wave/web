import React from 'react';
import styles from './style.css';

export default class HeaderBar extends React.Component {
  render() {
    return (
      <div className={styles['header-bar']}>
        <h1 className={styles.title}>{this.props.title}</h1>
      </div>
    );
  }
}
