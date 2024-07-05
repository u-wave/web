import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

const labelClasses = {
  root: 'SettingControl-label',
  label: 'SettingControl-labelText',
};

type SettingControlProps = {
  label: string,
  helpText?: React.ReactNode,
  children: React.ReactElement,
};
function SettingControl({ label, helpText, children }: SettingControlProps) {
  return (
    <FormControl className="SettingControl">
      <FormControlLabel
        classes={labelClasses}
        label={label}
        labelPlacement="start"
        control={children}
      />
      {helpText ? (<FormHelperText>{helpText}</FormHelperText>) : null}
    </FormControl>
  );
}

export default SettingControl;
