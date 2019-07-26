import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import upperCaseFirst from 'upper-case-first';
import RoleColor from '../RoleColor';

function UserRole({ roleName }) {
  const { t } = useTranslator();

  return (
    <RoleColor component="div" className="UserRole" role={roleName}>
      {t(`roles.${roleName}`, { defaultValue: upperCaseFirst(roleName) })}
    </RoleColor>
  );
}

UserRole.propTypes = {
  roleName: PropTypes.string.isRequired,
};

export default UserRole;
