import { expect } from 'chai';
import { ADVANCE, LOAD_HISTORY_COMPLETE } from '../../src/constants/actionTypes/booth';
import roomHistory from '../../src/reducers/roomHistory';

const initialState = () => roomHistory(undefined, { type: '@@redux/INIT' });

describe('reducers/roomHistory', () => {
  it('should default to an empty array', () => {
    let state;
    state = roomHistory(state, { type: '@@redux/INIT' });
    expect(state).to.be.an('array');
    expect(state).to.have.length(0);
  });

  const serverHistoryEntry = {
    _id: '56b12b90d6bfe93733bece96',
    user: {
      _id: '563ba1e3f059363574f4d0d9',
      slug: 'narahye',
      username: 'Narahye'
    },
    media: {
      _id: '56b11d3ad6bfe93733bece65',
      media: {
        _id: '56b11d3ad6bfe93733bece64',
        sourceType: 'youtube',
        sourceID: 'B7TlT1O7kjs',
        artist: '[ 타블로 디스 ] Superbee (슈퍼비)',
        title: '앰뷸런스 Ambulance',
        thumbnail: 'https://i.ytimg.com/vi/B7TlT1O7kjs/hqdefault.jpg',
        duration: 201
      },
      artist: 'Superbee (슈퍼비)',
      title: '앰뷸런스 Ambulance',
      end: 201,
      start: 0
    },
    playlist: '566b2d496c056392550f182b',
    favorites: [],
    downvotes: [],
    upvotes: [],
    played: '2016-02-02T22:20:00.468Z'
  };

  describe('action: LOAD_HISTORY_COMPLETE', () => {
    it('should normalize the loaded history entries', () => {
      let state = initialState();
      state = roomHistory(state, {
        type: LOAD_HISTORY_COMPLETE,
        payload: [ serverHistoryEntry ]
      });
      expect(state).to.eql([ {
        _id: '56b12b90d6bfe93733bece96',
        user: {
          _id: '563ba1e3f059363574f4d0d9',
          slug: 'narahye',
          username: 'Narahye'
        },
        media: {
          _id: '56b11d3ad6bfe93733bece65',
          sourceType: 'youtube',
          sourceID: 'B7TlT1O7kjs',
          thumbnail: 'https://i.ytimg.com/vi/B7TlT1O7kjs/hqdefault.jpg',
          artist: 'Superbee (슈퍼비)',
          title: '앰뷸런스 Ambulance',
          duration: 201,
          start: 0,
          end: 201,
          // TODO maybe get rid of this? :P
          media: {
            _id: '56b11d3ad6bfe93733bece64',
            sourceType: 'youtube',
            sourceID: 'B7TlT1O7kjs',
            thumbnail: 'https://i.ytimg.com/vi/B7TlT1O7kjs/hqdefault.jpg',
            artist: '[ 타블로 디스 ] Superbee (슈퍼비)',
            title: '앰뷸런스 Ambulance',
            duration: 201
          }
        },
        stats: {
          favorites: [],
          downvotes: [],
          upvotes: []
        },
        timestamp: new Date('2016-02-02T22:20:00.468Z').getTime()
      } ]);
    });
  });

  describe('action: ADVANCE', () => {
    it('prepends a new history entry', () => {
      let state = roomHistory(undefined, {
        type: LOAD_HISTORY_COMPLETE,
        payload: [ serverHistoryEntry ]
      });
      expect(state).to.have.length(1);
      expect(state[0]._id).to.equal('56b12b90d6bfe93733bece96');
      state = roomHistory(state, {
        type: ADVANCE,
        payload: {
          historyID: '56b12c59d6bfe93733bece97',
          userID: '562b748139c99dde22c6a499',
          playlistID: '563f390cf059363574f4d4dd',
          user: {
            _id: '562b748139c99dde22c6a499',
            slug: 'reanna',
            username: 'ReAnna'
          },
          media: {
            _id: '569ac78a2b029e7d71a2ce43',
            sourceType: 'youtube',
            sourceID: '7SvxB_NL5cs',
            artist: 'Eleanoora Rosenholm',
            title: 'Maailmanloppu',
            thumbnail: 'https://i.ytimg.com/vi/7SvxB_NL5cs/hqdefault.jpg',
            duration: 267,
            start: 0,
            end: 267
          },
          timestamp: new Date('2016-02-02T22:23:21.519Z').getTime()
        }
      });

      expect(state).to.have.length(2);
      expect(state[1]._id).to.equal('56b12b90d6bfe93733bece96');

      expect(state[0]).to.eql({
        _id: '56b12c59d6bfe93733bece97',
        user: {
          _id: '562b748139c99dde22c6a499',
          slug: 'reanna',
          username: 'ReAnna'
        },
        media: {
          _id: '569ac78a2b029e7d71a2ce43',
          sourceType: 'youtube',
          sourceID: '7SvxB_NL5cs',
          artist: 'Eleanoora Rosenholm',
          title: 'Maailmanloppu',
          thumbnail: 'https://i.ytimg.com/vi/7SvxB_NL5cs/hqdefault.jpg',
          duration: 267,
          start: 0,
          end: 267
        },
        stats: {
          favorites: [],
          downvotes: [],
          upvotes: []
        },
        timestamp: new Date('2016-02-02T22:23:21.519Z').getTime()
      });
    });
    it('works with NULL advances', () => {
      let state = roomHistory(undefined, {
        type: LOAD_HISTORY_COMPLETE,
        payload: [ serverHistoryEntry ]
      });
      expect(state).to.have.length(1);

      state = roomHistory(state, {
        type: ADVANCE,
        payload: null
      });
      expect(state).to.have.length(1);
    });
  });
});
