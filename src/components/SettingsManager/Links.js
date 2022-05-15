import React from 'react';
import { useTranslator } from '@u-wave/react-translate';
import Button from '@mui/material/Button';
import LicenseIcon from '@mui/icons-material/Copyright';
import GithubIcon from './GithubIcon';

function Link(props) {
  return (
    <Button
      className="SettingsPanel-link"
      target="_blank"
      {...props}
    />
  );
}

function Links() {
  const { t } = useTranslator();

  return (
    <div>
      <h2 className="SettingsPanel-header">{t('settings.links.title')}</h2>
      <Link href="http://u-wave.net">
        <GithubIcon className="SettingsPanel-linkIcon" />
        {t('settings.links.website')}
      </Link>
      <Link href="https://github.com/u-wave/web">
        <GithubIcon className="SettingsPanel-linkIcon" />
        {t('settings.links.source')}
      </Link>
      <Link href="https://github.com/u-wave/web/tree/default/LICENSE">
        <LicenseIcon className="SettingsPanel-linkIcon" />
        {t('settings.links.license')}
      </Link>
      <Link href="https://github.com/twitter/twemoji/blob/master/LICENSE-GRAPHICS">
        <LicenseIcon className="SettingsPanel-linkIcon" />
        {t('settings.links.twemojiLicense')}
      </Link>
    </div>
  );
}

export default Links;
