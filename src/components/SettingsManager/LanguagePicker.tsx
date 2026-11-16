import { useTranslator } from '@u-wave/react-translate';
import Select, { MenuItem, type SelectProps } from '../../components/Select';
import { useSelector } from '../../hooks/useRedux';
import { availableLanguagesSelector } from '../../reducers/locales';

function LanguagePicker(props: SelectProps<string>) {
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
