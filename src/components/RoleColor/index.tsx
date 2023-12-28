import React from 'react';
import { useSelector } from '../../hooks/useRedux';
import { roleColorsSelector } from '../../reducers/config';

type RoleColorProps<Base extends React.ElementType = 'span'> = React.ComponentPropsWithoutRef<Base> & {
  component?: Base,
  roles: string[],
}

function RoleColor({
  component: Component = 'span',
  roles,
  ...props
}: RoleColorProps) {
  const colors: Record<string, string> = useSelector(roleColorsSelector);

  const firstRoleWithColor = roles.find((r) => colors[r]);

  const style = {
    color: colors[firstRoleWithColor ?? 'default'],
  };

  return <Component {...props} style={style} />;
}

export default RoleColor;
