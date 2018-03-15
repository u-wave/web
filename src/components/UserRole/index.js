import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { translate } from 'react-i18next';
import upperCaseFirst from 'upper-case-first';

const UserRole = ({
  t,
  muiTheme,
  roleName,
}) => (
  <div className="UserRole" style={{ color: muiTheme.rankColors[roleName] }}>
    {t(`roles.${roleName}`, { defaultValue: upperCaseFirst(roleName) })}
  </div>
);

UserRole.propTypes = {
  t: PropTypes.func.isRequired,
  muiTheme: PropTypes.object.isRequired,
  roleName: PropTypes.string.isRequired,
};

export default compose(
  muiThemeable(),
  translate(),
)(UserRole);
