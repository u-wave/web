import * as React from 'react';
import Tabs from '../../../components/Tabs';
import Tab from '../../../components/Tabs/Tab';
import Video from '../../../containers/Video';
import Chat from '../../containers/Chat';
import RoomUserList from '../../../containers/RoomUserList';
import WaitList from '../../../containers/WaitList';
import ViewTemplate from './ViewTemplate';

const MainView = ({
  selected,
  onTabChange
}) => (
  <Tabs
    className="MainView"
    contentContainerClassName="MainView-content"
    value={selected}
    onChange={onTabChange}
    tabTemplate={ViewTemplate}
  >
    <Tab value="chat" label="Video">
      <div className="MobileApp-video">
        <Video
          enabled
          size="large"
        />
      </div>
      <div className="MobileApp-chat">
        <Chat />
      </div>
    </Tab>
    <Tab value="users" label="Users">
      <RoomUserList />
    </Tab>
    <Tab value="waitlist" label="Waitlist">
      <WaitList />
    </Tab>
  </Tabs>
);

MainView.propTypes = {
  selected: React.PropTypes.string.isRequired,
  onTabChange: React.PropTypes.func.isRequired
};

export default MainView;
