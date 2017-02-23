import * as React from 'react';
import compose from 'recompose/compose';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { translate } from 'react-i18next';
import upperCaseFirst from 'upper-case-first';

const UserRole = ({
  t,
  muiTheme,
  roleName
}) => (
  <div className="UserRole" style={{ color: muiTheme.rankColors[roleName] }}>
    {t(`roles.${roleName}`, { defaultValue: upperCaseFirst(roleName) })}
  </div>
);

UserRole.propTypes = {
  t: React.PropTypes.func.isRequired,
  muiTheme: React.PropTypes.object.isRequired,
  roleName: React.PropTypes.string.isRequired
};

export default compose(
  muiThemeable(),
  translate()
)(UserRole);
