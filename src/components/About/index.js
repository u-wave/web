import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import List, { ListItem, ListItemText } from '../List';
import OverlayHeader from '../Overlay/Header';
import OverlayContent from '../Overlay/Content';
import ServerList from '../ServerList';

const { useState } = React;

function About({
  onCloseOverlay,
  hasAboutPage,
  render: AboutPanel,
}) {
  const { t } = useTranslator();
  const [active, setActive] = useState(hasAboutPage ? 'about' : 'servers');

  return (
    <div className="About">
      <OverlayHeader
        title={t('about.about')}
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
              <ListItemText primary={t('about.about')} />
            </ListItem>
          )}
          <ListItem
            className="AboutPanel-menuItem"
            selected={active === 'servers'}
            onClick={() => setActive('servers')}
          >
            <ListItemText primary={t('about.servers')} />
          </ListItem>
        </List>
        <div className="AboutPanel-content">
          {active === 'about' && <AboutPanel />}
          {active === 'servers' && <ServerList />}
        </div>
      </OverlayContent>
    </div>
  );
}

About.propTypes = {
  onCloseOverlay: PropTypes.func.isRequired,
  hasAboutPage: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
};

export default About;
