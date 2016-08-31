import * as React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

// HACK.
const getResourceName = (i18n, language) => i18n.store.data[language].name;

const menuStyle = {
  float: 'right',
  margin: -18
};
const itemStyle = {
  WebkitAppearance: 'initial'
};

const LanguagePicker = (props, { i18n }) => (
  <DropDownMenu
    style={menuStyle}
    {...props}
  >
    {i18n.availableLanguages.map(lang => (
      <MenuItem
        style={itemStyle}
        value={lang}
        primaryText={getResourceName(i18n, lang)}
      />
    ))}
  </DropDownMenu>
);

// ALSO A HACK.
LanguagePicker.contextTypes = {
  i18n: React.PropTypes.object.isRequired
};

export default LanguagePicker;
