import { useTranslator } from '@u-wave/react-translate';
import upperCaseFirst from '../../utils/upperCaseFirst';
import RoleColor from '../RoleColor';

type UserRoleProps = {
  roleName: string,
};
function UserRole({ roleName }: UserRoleProps) {
  const { t } = useTranslator();

  let name;
  // TODO(goto-bus-stop) this should not throw in the first place.
  try {
    name = t(`roles.${roleName}`, { defaultValue: upperCaseFirst(roleName) });
  } catch {
    name = upperCaseFirst(roleName);
  }

  return (
    <RoleColor component="div" className="UserRole" roles={[roleName]}>
      {name}
    </RoleColor>
  );
}

export default UserRole;
