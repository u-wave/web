import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import HistoryIcon from '@material-ui/icons/History';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import AppTitle from '../HeaderBar/AppTitle';
import SongTitle from '../SongTitle';
import LoadingIndicator from './LoadingIndicator';
import Filler from './Filler';

function noop() {}

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

function DesktopSkeleton() {
  return (
    <div className="App">
      <div className="AppColumn AppColumn--left">
        <div className="AppRow AppRow--top">
          <FakeHeaderBar />
        </div>
        <div className="AppRow AppRow--middle">
          <LoadingIndicator />
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
}

export default DesktopSkeleton;
