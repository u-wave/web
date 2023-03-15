import Slider from '@mui/material/Slider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import IconButton from '@mui/material/IconButton';
import { mdiHistory, mdiVolumeOff } from '@mdi/js';
import AppTitle from '../HeaderBar/AppTitle';
import SvgIcon from '../SvgIcon';
import SongTitle from '../SongTitle';
import LoadingIndicator from './LoadingIndicator';
import Filler from './Filler';

function FakeVolume() {
  return (
    <div className="VolumeSlider">
      <IconButton>
        <SvgIcon path={mdiVolumeOff} />
      </IconButton>
      <div className="VolumeSlider-slider">
        <Slider
          size="small"
          min={0}
          max={100}
          step={1}
          value={0}
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
      </div>
      <div className="HeaderBar-volume">
        <FakeVolume />
      </div>
      <div className="HeaderBar-history">
        <IconButton className="HistoryButton">
          <SvgIcon path={mdiHistory} className="HistoryButton-icon" />
        </IconButton>
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
        <div className="SidePanels">
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
    </div>
  );
}

export default DesktopSkeleton;
