import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const getResourceName = (i18n, language) =>
  i18n.t(`locales.${language}`);

const menuStyle = {
  float: 'right',
  margin: -18,
};
const itemStyle = {
  WebkitAppearance: 'initial',
};

const LanguagePicker = (props, { i18n }) => (
  <DropDownMenu
    style={menuStyle}
    {...props}
  >
    {i18n.availableLanguages.map(lang => (
      <MenuItem
        key={lang}
        style={itemStyle}
        value={lang}
        primaryText={getResourceName(i18n, lang)}
      />
    ))}
  </DropDownMenu>
);

LanguagePicker.contextTypes = {
  i18n: PropTypes.object.isRequired,
};

export default LanguagePicker;
