import { advance } from '../actions/AdvanceActionCreators';
import assign from 'object-assign';

const debug = require('debug')('uwave:utils:advance');

const mediaList = [
  [ '1nCLBTmjJBY', '4Minute - 미쳐 (Crazy)', 193 ],
  [ 'Qk52ypnGs68', 'T-ARA (티아라) - Number Nine (넘버나인)', 234 ],
  [ 'zO9RzrhYR-I', 'miss A (미쓰에이) - 다른 남자 말고 너 (Only You)', 202 ],
  [ '2ips2mM7Zqw', 'BIGBANG - 뱅뱅뱅 (Bang Bang Bang)', 230 ],
  [ 'Hs8QGv2VqJA', 'BEAST - Good Luck', 250 ],
  [ 'gEqlF5N8UMs', 'WINNER - 공허해(EMPTY)', 248 ],
  [ '4xLFxfXWDUk', '4Minute - 오늘 뭐해 (Whatcha Doin\' Today)', 220 ]
];

const mediaTable = mediaList.map(([ sourceID, at, duration ]) => {
  return {
    sourceType: 'youtube',
    sourceID: sourceID,
    artist: at.split(' - ')[0],
    title: at.split(' - ')[1],
    duration: duration,
    start: 0,
    end: duration
  };
});

debug(mediaTable);

function get() {
  return mediaTable[Math.floor(Math.random() * mediaTable.length)];
}

export function connect() {
  let current = get();
  const initialSeek = Math.floor(Math.random() * current.end);
  let timeout = null;

  function next() {
    advance(current = get());
    debug('advance', current);

    clearTimeout(timeout);
    timeout = setTimeout(next, (current.end - current.start) * 1000);
  }

  // simulate joining a room halfway through a song
  timeout = setTimeout(() => {
    advance(assign({ seek: initialSeek }, current));
    debug('init current play', current);

    // other advances proceed normally
    clearTimeout(timeout);
    timeout = setTimeout(next, (current.end - initialSeek) * 1000);
  });
}
