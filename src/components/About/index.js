import React from 'react';
import PropTypes from 'prop-types';
import withState from 'recompose/withState';
import List, { ListItem, ListItemText } from '../List';
import OverlayHeader from '../Overlay/Header';
import OverlayContent from '../Overlay/Content';
import ServerList from './ServerList';

const enhance = withState(
  'active',
  'setActive',
  ({ hasAboutPage }) => (hasAboutPage ? 'about' : 'servers'),
);

const About = ({
  onCloseOverlay,
  active,
  setActive,
  hasAboutPage,
  render: AboutPanel,
}) => (
  <div className="About">
    <OverlayHeader
      title="About"
      onCloseOverlay={onCloseOverlay}
      direction="top"
    />
    <OverlayContent className="AboutPanel">
      <List className="AboutPanel-menu">
        {hasAboutPage && (
          <ListItem
            className="AboutPanel-menuItem"
            selected={active === 'about'}
            onClick={() => setActive('about')}
          >
            <ListItemText primary="About" />
          </ListItem>
        )}
        <ListItem
          className="AboutPanel-menuItem"
          selected={active === 'servers'}
          onClick={() => setActive('servers')}
        >
          <ListItemText primary="Servers" />
        </ListItem>
      </List>
      <div className="AboutPanel-content">
        {active === 'about' && <AboutPanel />}
        {active === 'servers' && <ServerList />}
      </div>
    </OverlayContent>
  </div>
);

About.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
  hasAboutPage: PropTypes.bool.isRequired,
  active: PropTypes.oneOf(['about', 'servers']).isRequired,
  setActive: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
};

export default enhance(About);
