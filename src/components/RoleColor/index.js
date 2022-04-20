import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { roleColorsSelector } from '../../selectors/configSelectors';

function RoleColor({
  component = 'span',
  role,
  roles,
  ...props
}) {
  const colors = useSelector(roleColorsSelector);

  const roleColor = role
    ? colors[role]
    : colors[roles.find((r) => colors[r])];

  const style = {
    color: roleColor ?? colors.default,
  };

  const Component = component;
  return <Component {...props} style={style} />;
}

RoleColor.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  role: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default RoleColor;
