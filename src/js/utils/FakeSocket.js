import EventEmitter from 'events';
import faker from 'faker';
import UserStore from '../stores/UserStore';

function makeRandomAdvance(userID) {
  const mediaList = [
    [ '1nCLBTmjJBY', '4Minute - 미쳐 (Crazy)', 193 ],
    [ 'Qk52ypnGs68', 'T-ARA (티아라) - Number Nine (넘버나인)', 234 ],
    [ 'zO9RzrhYR-I', 'miss A (미쓰에이) - 다른 남자 말고 너 (Only You)', 202 ],
    [ '2ips2mM7Zqw', 'BIGBANG - 뱅뱅뱅 (Bang Bang Bang)', 230 ],
    [ 'Hs8QGv2VqJA', 'BEAST - Good Luck', 250 ],
    [ 'gEqlF5N8UMs', 'WINNER - 공허해(EMPTY)', 248 ],
    [ '4xLFxfXWDUk', '4Minute - 오늘 뭐해 (Whatcha Doin\' Today)', 220 ]
  ];

  const [ sourceID, at, duration ] = faker.random.arrayElement(mediaList);
  const [ artist, title ] = at.split(' - ');
  return {
    historyID: faker.random.uuid(),
    dj: UserStore.getUser(userID),
    media: {
      artist, title,
      sourceType: 'youtube',
      sourceID: sourceID,
      duration: duration,
      start: 0,
      end: duration
    },
    playlistID: faker.random.number(1e8),
    played: Date.now()
  };
}

export default class FakeSocket extends EventEmitter {
  currentMedia = null;
  waitlist = [];

  constructor() {
    super();
    this._chat = setTimeout(::this.simulateChat, 500);
    this._advance = setTimeout(::this.simulateAdvance, 100);
    this.waitlist = UserStore.getOnlineUsers().map(user => user.id);
  }

  send(pack) {
    // simulate network lag
    setTimeout(() => {
      const { command, data } = JSON.parse(pack);
      // totally a working chat server
      if (command === 'chat') {
        this.receive('chat', {
          chatID: faker.random.uuid(),
          userID: UserStore.getCurrentUser().id,
          timestamp: Date.now(),
          message: data
        });
      }
    }, faker.random.number({ min: 20, max: 300 }));
  }

  simulateChat() {
    this.randomChatMessage();
    this._chat = setTimeout(::this.simulateChat, faker.random.number({ min: 50, max: 2000 }));
  }

  simulateAdvance() {
    const dj = this.waitlist.shift();
    if (this.currentMedia) {
      this.waitlist.push(this.currentMedia.dj.id);
    }
    this.randomAdvance(dj);

    const wait = this.currentMedia.media.duration * 1000;
    this._advance = setTimeout(::this.simulateAdvance, wait);
  }

  receive(command, data) {
    // simulate network lag
    setTimeout(() => {
      this.emit('data', JSON.stringify({ command, data }));
    }, faker.random.number({ min: 20, max: 300 }));
  }

  randomChatMessage() {
    this.receive('chatMessage', {
      chatID: faker.random.uuid(),
      userID: faker.random.arrayElement(UserStore.getOnlineUsers()).id,
      timestamp: Date.now(),
      message: faker.hacker.phrase()
    });
  }

  randomAdvance(userID) {
    this.currentMedia = makeRandomAdvance(userID);
    this.receive('advance', this.currentMedia);
  }
}
