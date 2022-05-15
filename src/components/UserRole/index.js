import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import upperCaseFirst from '../../utils/upperCaseFirst';
import RoleColor from '../RoleColor';

function UserRole({ roleName }) {
  const { t } = useTranslator();

  let name;
  // TODO(goto-bus-stop) this should not throw in the first place.
  try {
    name = t(`roles.${roleName}`, { defaultValue: upperCaseFirst(roleName) });
  } catch {
    name = upperCaseFirst(roleName);
  }

  return (
    <RoleColor component="div" className="UserRole" username={roleName}>
      {t(`roles.${roleName}`, { defaultValue: upperCaseFirst(roleName) })}
    </RoleColor>
  );
}

UserRole.propTypes = {
  roleName: PropTypes.string.isRequired,
};

export default UserRole;
