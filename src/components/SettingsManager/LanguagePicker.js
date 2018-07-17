import React from 'react';
import PropTypes from 'prop-types';
import getContext from 'recompose/getContext';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const getResourceName = (i18n, language) => i18n.t(`locales.${language}`);

const enhance = getContext({
  i18n: PropTypes.object,
});

const LanguagePicker = ({ i18n, ...props }) => (
  <Select className="LanguagePicker" {...props}>
    {i18n.availableLanguages.map(lang => (
      <MenuItem key={lang} value={lang}>
        {getResourceName(i18n, lang)}
      </MenuItem>
    ))}
  </Select>
);

LanguagePicker.propTypes = {
  i18n: PropTypes.object.isRequired,
};

export default enhance(LanguagePicker);
