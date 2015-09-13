import React from 'react';
import Chat from './Chat';
import Video from './Video';
import styles from './style.css';

export default class App extends React.Component {

  render() {
    return (
      <div className={styles.main}>
        <div className={styles['header-bar']}>
          <h1 className={styles.title}>üwave</h1>
        </div>
        <div className={styles.middle}>
          <div className={styles.left}>
            <Video />
          </div>
          <div className={styles.right}>
            <Chat />
          </div>
        </div>
        <div className={styles['bottom-bar']}>
          .
        </div>
      </div>
    );
  }

}
