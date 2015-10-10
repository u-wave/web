import EventEmitter from 'events';
import faker from 'faker';
import UserStore from '../stores/UserStore';

function makeRandomAdvance(userID) {
  const mediaList = [
    [ 'youtube', '1nCLBTmjJBY', '4Minute - 미쳐 (Crazy)', 193 ],
    [ 'youtube', 'Qk52ypnGs68', 'T-ARA (티아라) - Number Nine (넘버나인)', 234 ],
    [ 'youtube', 'zO9RzrhYR-I', 'miss A (미쓰에이) - 다른 남자 말고 너 (Only You)', 202 ],
    [ 'youtube', '2ips2mM7Zqw', 'BIGBANG - 뱅뱅뱅 (Bang Bang Bang)', 230 ],
    [ 'youtube', 'Hs8QGv2VqJA', 'BEAST - Good Luck', 250 ],
    [ 'youtube', 'gEqlF5N8UMs', 'WINNER - 공허해(EMPTY)', 248 ],
    [ 'youtube', '4xLFxfXWDUk', '4Minute - 오늘 뭐해 (Whatcha Doin\' Today)', 220 ]
  ];

  const [ sourceType, sourceID, at, duration ] = faker.random.arrayElement(mediaList);
  const [ artist, title ] = at.split(' - ');
  return {
    historyID: faker.random.uuid(),
    dj: UserStore.getUser(userID),
    media: {
      artist, title,
      sourceType, sourceID,
      duration: duration,
      start: 0,
      end: duration,
      thumbnail: `https://i.ytimg.com/vi/${sourceID}/sddefault.jpg`
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
    this._users = setTimeout(::this.simulateUsers, 3000);
    this.waitlist = UserStore.getOnlineUsers().map(user => user.id);
  }

  send(pack) {
    // simulate network lag
    setTimeout(() => {
      const { command, data } = JSON.parse(pack);
      // totally a working chat server
      if (command === 'chat') {
        this.receive('chatMessage', {
          chatID: faker.random.uuid(),
          userID: UserStore.getCurrentUser().id,
          timestamp: Date.now(),
          message: data
        });
      }
    }, faker.random.number({ min: 20, max: 300 }));
  }

  simulateChat() {
    if (this._chat) clearTimeout(this._chat);
    this.randomChatMessage();
    this._chat = setTimeout(::this.simulateChat, faker.random.number({ min: 50, max: 2000 }));
  }

  simulateAdvance() {
    if (this._advance) clearTimeout(this._advance);
    const dj = this.waitlist.shift();
    const next = makeRandomAdvance(dj);
    const duration = (next.media.end - next.media.start) * 1000;
    if (this.currentMedia) {
      this.waitlist.push(this.currentMedia.dj.id);
    } else {
      next.played -= Math.floor(Math.random() * duration);
    }
    this.currentMedia = next;
    this.receive('advance', this.currentMedia);

    const endTime = next.played + duration;
    this._advance = setTimeout(::this.simulateAdvance, endTime - Date.now());
  }

  simulateUsers() {
    if (this._users) clearTimeout(this._users);
    if (faker.random.number(4) === 0) {
      this.randomUserJoinLeave();
    }
    this._users = setTimeout(::this.simulateUsers, 3000);
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

  randomUserJoinLeave() {
    if (faker.random.boolean()) {
      // join
      const username = faker.internet.userName();
      this.receive('join', {
        id: faker.random.uuid(),
        username: username,
        avatar: faker.internet.avatar(),
        role: faker.random.number({ min: 0, max: 6 })
      });
    } else {
      // leave
      const me = UserStore.getCurrentUser();
      const users = UserStore.getOnlineUsers().filter(user => user !== me);
      const partyPooper = faker.random.arrayElement(users);
      this.receive('leave', partyPooper.id);
    }
  }
}
