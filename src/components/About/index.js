import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import { translate } from 'react-i18next';
import List, { ListItem, ListItemText } from '../List';
import OverlayHeader from '../Overlay/Header';
import OverlayContent from '../Overlay/Content';
import ServerList from '../ServerList';

const enhance = compose(
  translate(),
  withState(
    'active',
    'setActive',
    ({ hasAboutPage }) => (hasAboutPage ? 'about' : 'servers'),
  ),
);

const About = ({
  t,
  onCloseOverlay,
  active,
  setActive,
  hasAboutPage,
  render: AboutPanel,
}) => (
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

About.propTypes = {
  t: PropTypes.func.isRequired,
  onCloseOverlay: PropTypes.func.isRequired,
  hasAboutPage: PropTypes.bool.isRequired,
  active: PropTypes.oneOf(['about', 'servers']).isRequired,
  setActive: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
};

export default enhance(About);
