import { connect } from 'react-redux';
import ms from 'ms';
import BansList from '../components/BansList';

const mapStateToProps = () => ({
  bans: [
    {
      user: {
        _id: '56fc19aaf9e719885a7d9e0e',
        updatedAt: '2016-03-30T18:23:38Z',
        createdAt: '2016-03-30T18:23:38Z',
        slug: 'test-first-playlist',
        username: 'test-first-playlist',
        exiled: false,
        lastSeen: '2016-03-30T18:23:38.502Z',
        level: 0,
        avatar: '',
        role: 0,
        language: 'en',
        roles: [ 'user' ]
      },
      moderator: {
        _id: '56c87fde3c2a107c4483c8e0',
        slug: 'notest',
        username: 'notest',
        banned: null,
        exiled: false,
        lastSeen: '2016-02-20T15:01:50.755Z',
        level: 0,
        avatar: '',
        role: 2,
        language: 'en',
        joined: '2016-02-20T15:01:50.755Z',
        roles: [ 'moderator' ]
      },
      duration: ms('3 days'),
      reason: 'Being a butt.'
    },
    {
      user: {
        _id: '56fc2908f9e719885a7d9e11',
        updatedAt: '2016-03-31T11:25:04.622Z',
        createdAt: '2016-03-30T19:29:12Z',
        slug: 'hoihoi3',
        username: 'hoihoi3',
        exiled: false,
        lastSeen: '2016-03-30T19:29:12.109Z',
        level: 0,
        avatar: '',
        role: 0,
        language: 'en',
        lastSeenAt: '2016-03-31T11:24:57.033Z',
        roles: [ 'user' ]
      },
      moderator: {
        _id: '560e9350eb6b1f4627d8d070',
        slug: 'test',
        username: 'Test',
        banned: null,
        exiled: false,
        lastSeen: '2015-10-02T14:23:12.080Z',
        level: 0,
        avatar: '',
        role: 3,
        language: 'en',
        joined: '2015-10-02T14:23:12.079Z',
        roles: [ 'manager' ]
      },
      duration: ms('100 years'),
      reason: 'Being a butt.'
    },
    {
      user: {
        _id: '56217e5ea066ed7761ef6b78',
        slug: 'testaccount2',
        username: 'TestAccount2',
        banned: null,
        exiled: false,
        lastSeen: '2015-10-16T22:46:54.382Z',
        level: 0,
        avatar: '',
        role: 0,
        language: 'en',
        joined: '2015-10-16T22:46:54.382Z',
        roles: [ 'user' ]
      },
      moderator: {
        _id: '560e9350eb6b1f4627d8d070',
        slug: 'test',
        username: 'Test',
        banned: null,
        exiled: false,
        lastSeen: '2015-10-02T14:23:12.080Z',
        level: 0,
        avatar: '',
        role: 3,
        language: 'en',
        joined: '2015-10-02T14:23:12.079Z',
        roles: [ 'manager' ]
      },
      duration: ms('50 minutes'),
      reason: ''
    }
  ]
});

export default connect(mapStateToProps)(BansList);
