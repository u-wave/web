import React from 'react';
import PropTypes from 'prop-types';
import withProps from 'recompose/withProps';
import { translate } from 'react-i18next';
import FlatButton from 'material-ui/FlatButton';
import LicenseIcon from 'material-ui/svg-icons/action/copyright';
import GithubIcon from './GithubIcon';

const enhance = translate();

const linkStyle = {
  display: 'block',
  height: 24,
  lineHeight: '24px',
  marginBottom: 20,
  textAlign: 'left',
  WebkitAppearance: 'initial',
};
const iconStyle = { verticalAlign: 'top' };

const Link = withProps({
  style: linkStyle,
  target: '_blank',
  labelPosition: 'after',
  backgroundColor: 'transparent',
  hoverColor: 'transparent',
})(FlatButton);

const Links = ({ t }) => (
  <div>
    <h2 className="SettingsPanel-header">{t('settings.links.title')}</h2>
    <Link
      href="https://github.com/u-wave"
      label={t('settings.links.website')}
    >
      <GithubIcon style={iconStyle} />
    </Link>
    <Link
      href="https://github.com/u-wave/web"
      label={t('settings.links.source')}
    >
      <GithubIcon style={iconStyle} />
    </Link>
    <Link
      href="https://github.com/u-wave/web/tree/master/LICENSE"
      label={t('settings.links.license')}
    >
      <LicenseIcon style={iconStyle} />
    </Link>
  </div>
);

Links.propTypes = {
  t: PropTypes.func.isRequired,
};

export default enhance(Links);
