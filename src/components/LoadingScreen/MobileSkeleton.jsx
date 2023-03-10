import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { mdiHistory, mdiMenu } from '@mdi/js';
import SvgIcon from '../SvgIcon';
import LoadingIndicator from './LoadingIndicator';
import Filler from './Filler';

const waitlistIconStyle = {
  fontSize: '125%',
  textAlign: 'center',
};

function MobileSkeleton() {
  return (
    <div className="App MobileApp is-mobile MobileApp--videoEnabled">
      <div className="MainView">
        <AppBar position="static" className="MainView-appBar">
          <Toolbar>
            <IconButton>
              <SvgIcon path={mdiMenu} />
            </IconButton>
            <Typography variant="h6" className="MainView-title">
              <Filler width={200} />
            </Typography>
            <IconButton>
              <SvgIcon path={mdiHistory} />
            </IconButton>
            <IconButton style={waitlistIconStyle}>
              <Filler width={20} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className="MainView-content">
          <div className="MobileApp-video">
            <LoadingIndicator />
          </div>
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

export default MobileSkeleton;
