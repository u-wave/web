import { log } from '../../actions/ChatActionCreators';
import { setVolume, mute, unmute } from '../../actions/PlaybackActionCreators';
import { doUpvote, doDownvote } from '../../actions/VoteActionCreators';
import { set as setSetting } from '../../reducers/settings';

export default [
  {
    name: 'volume',
    description: 'Set the current volume.',
    action: (_commander, value) => {
      const volume = parseInt(value, 10);
      if (!Number.isFinite(volume) || volume < 0 || volume > 100) {
        return log('Volume must be a number between 0 and 100.');
      }
      return setVolume(volume);
    },
  },
  {
    name: 'mute',
    description: 'Mute the volume.',
    action: () => mute(),
  },

  {
    name: 'unmute',
    description: 'Unmute the media volume.',
    action: () => unmute(),
  },

  {
    name: 'upvote',
    description: 'Upvote the current track.',
    action: () => doUpvote(),
  },

  {
    name: 'downvote',
    description: 'Downvote the current track.',
    action: () => doDownvote(),
  },

  {
    name: 'playback',
    description: 'Enable or disable playback. Syntax: "/playback on|off"',
    action: (_commander, type) => {
      if (type.toLowerCase() === 'on') {
        return setSetting('videoEnabled', true);
      }
      if (type.toLowerCase() === 'off') {
        return setSetting('videoEnabled', false);
      }
      return log('Use "/playback on" to enable media playback or "/playback off" to disable it.');
    },
  },
];
