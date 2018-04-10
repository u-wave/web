import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import { translate } from 'react-i18next';
import Button from 'material-ui/Button';
import LicenseIcon from '@material-ui/icons/Copyright';
import GithubIcon from './GithubIcon';

const enhance = translate();

const Link = withProps({
  className: 'SettingsPanel-link',
  target: '_blank',
})(Button);

const Links = ({ t }) => (
  <div>
    <h2 className="SettingsPanel-header">{t('settings.links.title')}</h2>
    <Link href="https://github.com/u-wave">
      <GithubIcon className="SettingsPanel-linkIcon" />
      {t('settings.links.website')}
    </Link>
    <Link href="https://github.com/u-wave/web">
      <GithubIcon className="SettingsPanel-linkIcon" />
      {t('settings.links.source')}
    </Link>
    <Link href="https://github.com/u-wave/web/tree/master/LICENSE">
      <LicenseIcon className="SettingsPanel-linkIcon" />
      {t('settings.links.license')}
    </Link>
  </div>
);

Links.propTypes = {
  t: PropTypes.func.isRequired,
};

export default enhance(Links);
