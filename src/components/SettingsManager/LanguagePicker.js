import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslator } from '@u-wave/react-translate';
import { useSelector } from 'react-redux';
import { availableLanguagesSelector } from '../../selectors/localeSelectors';

function LanguagePicker(props) {
  const { t } = useTranslator();
  const availableLanguages = useSelector(availableLanguagesSelector);

  return (
    <Select variant="standard" className="LanguagePicker" {...props}>
      {availableLanguages.map((lang) => (
        <MenuItem key={lang} value={lang}>
          {t(`locales.${lang}`)}
        </MenuItem>
      ))}
    </Select>
  );
}

export default LanguagePicker;
