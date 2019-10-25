import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';
import WarningIcon from '@material-ui/icons/Warning';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import AppTitle from '../HeaderBar/AppTitle';
import SongTitle from '../SongTitle';

function noop() {}

function Filler({ width }) {
  const style = {
    display: 'inline-block',
    background: '#444',
    height: '1em',
    width,
    verticalAlign: 'middle',
  };

  return <span style={style} />;
}
Filler.propTypes = {
  width: PropTypes.number.isRequired,
};

function FakeVolume() {
  return (
    <div className="VolumeSlider">
      <IconButton onClick={noop}>
        <VolumeOffIcon />
      </IconButton>
      <div className="VolumeSlider-slider">
        <Slider
          min={0}
          max={100}
          step={1}
          value={0}
          onChange={noop}
        />
      </div>
    </div>
  );
}

const fakeSongTitle = (
  <SongTitle
    artist={<Filler width={200} />}
    title={<Filler width={300} />}
  />
);

function FakeHeaderBar() {
  return (
    <div className="HeaderBar App-header">
      <AppTitle className="HeaderBar-title">...</AppTitle>
      <div className="HeaderBar-nowPlaying">
        <div className="HeaderBar-media">
          {fakeSongTitle}
        </div>
        <div className="HeaderBar-dj">
          <Filler width={300} />
        </div>
        <div className="HeaderBar-volume">
          <FakeVolume />
        </div>
        <div className="HeaderBar-history">
          <IconButton className="HistoryButton">
            <HistoryIcon className="HistoryButton-icon" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function FakeFooterBar() {
  return <div />;
}

const tabClasses = {
  root: 'SidePanel-tab',
  wrapper: 'SidePanel-tabLabel',
};

const DesktopLoadingScreen = () => (
  <div className="App">
    <div className="AppColumn AppColumn--left">
      <div className="AppRow AppRow--top">
        <FakeHeaderBar />
      </div>
      <div className="AppRow AppRow--middle">
        <div className="LoadingScreen">
          <CircularProgress className="LoadingScreen-loader" />
          <div className="LoadingScreen-warning" hidden>
            <WarningIcon color="error" fontSize="large" />
          </div>
          <p className="LoadingScreen-notice">
            üWave requires JavaScript to run.
          </p>
        </div>
      </div>
      <div className="AppRow AppRow--bottom">
        <FakeFooterBar />
      </div>
    </div>
    <div className="AppColumn AppColumn--right">
      <Tabs
        value={0}
        variant="fullWidth"
        classes={{
          root: 'SidePanel-tabs',
          indicator: 'SidePanel-indicator',
        }}
      >
        <Tab classes={tabClasses} label={<Filler width={70} />} />
        <Tab classes={tabClasses} label={<Filler width={70} />} />
        <Tab classes={tabClasses} label={<Filler width={100} />} />
      </Tabs>

      <div className="SidePanel-panel is-selected">
        <div className="ChatContainer">
          <div className="ChatContainer-messages">
            <div className="ChatMessage ChatMessage--motd">
              <div className="ChatMessage-content">
                <Filler width={400} />
              </div>
            </div>
          </div>
          <div className="ChatContainer-input ChatInputWrapper">
            <div className="ChatInput">
              <input className="ChatInput-input" type="text" disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function MobileLoadingScreen() {
  return (
    <div className="App MobileApp is-mobile App--videoEnabled">
      <div className="MainView">
        <AppBar position="static" className="MainView-appBar">
          <Toolbar>
            <IconButton>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" className="MainView-title">
              {fakeSongTitle}
            </Typography>
            <IconButton>
              <HistoryIcon />
            </IconButton>
            <IconButton style={waitlistIconStyle}>
              <Filler width={30} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className="MainView-content">
          <div className="MobileApp-video" />
          <div className="MobileApp-chat">
            <div className="ChatContainer">
              <div className="ChatContainer-messages">
                <div className="ChatMessage ChatMessage--motd">
                  <div className="ChatMessage-content">
                    <Filler width={400} />
                  </div>
                </div>
              </div>
              <div className="ChatContainer-input ChatInputWrapper">
                <div className="ChatInput">
                  <input className="ChatInput-input" type="text" disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopLoadingScreen;
