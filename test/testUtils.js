import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseMuiTheme from '../src/MuiTheme';

export const muiTheme = getMuiTheme(baseMuiTheme);
export const context = { muiTheme };
