import React from 'react';
import Chat from '../Chat';
import Video from '../Video';
import HeaderBar from '../HeaderBar';
import styles from './style.css';

export default class App extends React.Component {

  render() {
    return (
      <div className={styles.main}>
        <HeaderBar
          className={styles['header-bar']}
          title="üwave"
        />
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
