import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import upperCaseFirst from 'upper-case-first';
import RoleColor from '../RoleColor';

const enhance = translate();

const UserRole = ({
  t,
  roleName,
}) => (
  <RoleColor component="div" className="UserRole" role={roleName}>
    {t(`roles.${roleName}`, { defaultValue: upperCaseFirst(roleName) })}
  </RoleColor>
);

UserRole.propTypes = {
  t: PropTypes.func.isRequired,
  roleName: PropTypes.string.isRequired,
};

export default enhance(UserRole);
