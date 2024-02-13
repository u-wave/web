import React from 'react';
import { useSelector } from '../../hooks/useRedux';
import { roleColorsSelector } from '../../reducers/config';

type RoleColorPropsOwn = { roles: string[] }
// there's probably a better way to do this but if it works it works
type RoleColorPropsSpan =
  React.ComponentPropsWithoutRef<'span'> & RoleColorPropsOwn & { component?: undefined }
type RoleColorPropsBase<Base extends React.ElementType> =
  React.ComponentPropsWithoutRef<Base> & RoleColorPropsOwn & { component?: Base }

function RoleColor<Base extends React.ElementType = 'span'>({
  component: CustomComponent,
  roles,
  ...props
}: RoleColorPropsSpan | RoleColorPropsBase<Base>) {
  const colors: Record<string, string> = useSelector(roleColorsSelector);

  const firstRoleWithColor = roles.find((r) => colors[r]);

  const style = {
    color: colors[firstRoleWithColor ?? 'default'],
  };

  const Component = CustomComponent ?? 'span';
  return <Component {...props} style={style} />;
}

export default RoleColor;
