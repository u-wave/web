import { del } from '../../actions/RequestActionCreators';

// eslint-disable-next-line import/prefer-default-export
export function unbanUser(user) {
  return del(`/bans/${user._id}`, {});
}
