import bans from './bans';
import chat from './chat';
import help from './help';
import mutes from './mutes';
import playback from './playback';
import staff from './staff';
import users from './users';
import waitlist from './waitlist';

export default [
  ...bans,
  ...chat,
  ...help,
  ...mutes,
  ...playback,
  ...staff,
  ...users,
  ...waitlist,
];
