import React from 'react';
import PropTypes from 'prop-types';
import { roleColorsSelector } from '../../selectors/configSelectors';

function RoleColor({
  component = 'span',
  role,
  roles,
  username,
  ...props
}) {
  const color = roleColorsSelector(username);
  const style = { color };

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
  username: PropTypes.string,
};

export default RoleColor;
