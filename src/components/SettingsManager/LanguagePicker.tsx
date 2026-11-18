import { useTranslator } from '@u-wave/react-translate';
import Select, { MenuItem, type SelectProps } from '../../components/Select';
import { useSelector } from '../../hooks/useRedux';
import { availableLanguagesSelector } from '../../reducers/locales';

export type LanguagePickerProps = Pick<SelectProps<string>, 'value' | 'onChange'>;
function LanguagePicker({ value, onChange }: LanguagePickerProps) {
  const { t } = useTranslator();
  const availableLanguages = useSelector(availableLanguagesSelector);

  return (
    <Select variant="standard" className="LanguagePicker" value={value} onChange={onChange}>
      {availableLanguages.map((lang) => (
        <MenuItem key={lang} value={lang}>
          {t(`locales.${lang}`)}
        </MenuItem>
      ))}
    </Select>
  );
}

export default LanguagePicker;
