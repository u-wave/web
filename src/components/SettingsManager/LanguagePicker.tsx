import Select, { type SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslator } from '@u-wave/react-translate';
import { useSelector } from '../../hooks/useRedux';
import { availableLanguagesSelector } from '../../reducers/locales';

function LanguagePicker(props: SelectProps) {
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
