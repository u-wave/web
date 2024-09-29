import { useState } from 'react';
import { useTranslator } from '@u-wave/react-translate';
import type { EmptyObject } from 'type-fest';
import List, { ListItem, ListItemText } from '../List';
import OverlayHeader from '../Overlay/Header';
import OverlayContent from '../Overlay/Content';
import ServerList from '../ServerList';

type AboutProps = {
  onCloseOverlay: () => void,
  aboutComponent?: React.ComponentType<EmptyObject> | undefined,
};
function About({
  onCloseOverlay,
  aboutComponent: AboutPanel,
}: AboutProps) {
  const { t } = useTranslator();
  const [active, setActive] = useState(AboutPanel != null ? 'about' : 'servers');

  return (
    <div className="About">
      <OverlayHeader
        title={t('about.about')}
        onCloseOverlay={onCloseOverlay}
        direction="top"
      />
      <OverlayContent className="AboutPanel">
        <List className="AboutPanel-menu">
          {AboutPanel != null && (
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
          {active === 'about' && AboutPanel != null ? <AboutPanel /> : null}
          {active === 'servers' && <ServerList />}
        </div>
      </OverlayContent>
    </div>
  );
}

export default About;
