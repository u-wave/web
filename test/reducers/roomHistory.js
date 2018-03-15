import { expect } from 'chai';

import createStore from '../../src/store/configureStore';
import { setUsers } from '../../src/actions/UserActionCreators';
import { advance, loadHistoryComplete } from '../../src/actions/BoothActionCreators';
import * as s from '../../src/selectors/roomHistorySelectors';

describe('reducers/roomHistory', () => {
  it('should default to an empty array', () => {
    const { getState } = createStore();
    expect(s.roomHistorySelector(getState())).to.eql([]);
  });

  const userModel = {
    _id: '563ba1e3f059363574f4d0d9',
    slug: 'narahye',
    username: 'Narahye',
  };

  const mediaModel = {
    _id: '56b11d3ad6bfe93733bece64',
    sourceType: 'youtube',
    sourceID: 'B7TlT1O7kjs',
    artist: '[ 타블로 디스 ] Superbee (슈퍼비)',
    title: '앰뷸런스 Ambulance',
    thumbnail: 'https://i.ytimg.com/vi/B7TlT1O7kjs/hqdefault.jpg',
    duration: 201,
  };

  const serverHistoryEntry = {
    _id: '56b12b90d6bfe93733bece96',
    user: userModel._id,
    media: {
      _id: '56b11d3ad6bfe93733bece65',
      media: mediaModel._id,
      artist: 'Superbee (슈퍼비)',
      title: '앰뷸런스 Ambulance',
      end: 201,
      start: 0,
    },
    playlist: '566b2d496c056392550f182b',
    favorites: [],
    downvotes: [],
    upvotes: [],
    playedAt: '2016-02-02T22:20:00.468Z',
  };

  describe('action: LOAD_HISTORY_COMPLETE', () => {
    it('should normalize the loaded history entries', () => {
      const { dispatch, getState } = createStore();
      dispatch(loadHistoryComplete({
        data: [serverHistoryEntry],
        included: {
          user: [userModel],
          media: [mediaModel],
        },
        meta: {
          included: {
            media: ['media.media'],
            user: ['user'],
          },
          offset: 0,
          total: 1,
        },
      }));
      expect(s.roomHistorySelector(getState())).to.eql([{
        _id: '56b12b90d6bfe93733bece96',
        user: {
          _id: '563ba1e3f059363574f4d0d9',
          slug: 'narahye',
          username: 'Narahye',
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
            duration: 201,
          },
        },
        stats: {
          favorites: [],
          downvotes: [],
          upvotes: [],
        },
        timestamp: new Date('2016-02-02T22:20:00.468Z').getTime(),
      }]);
    });
  });

  describe('action: ADVANCE', () => {
    it('prepends a new history entry', () => {
      const { dispatch, getState } = createStore();
      dispatch(setUsers({
        users: [{
          _id: '562b748139c99dde22c6a499',
          slug: 'reanna',
          username: 'ReAnna',
        }],
      }));

      dispatch(loadHistoryComplete({
        data: [serverHistoryEntry],
        included: {
          user: [userModel],
          media: [mediaModel],
        },
        meta: {
          included: {
            media: ['media.media'],
            user: ['user'],
          },
          offset: 0,
          total: 1,
        },
      }));
      expect(s.roomHistorySelector(getState())).to.have.length(1);
      expect(s.roomHistorySelector(getState())[0]._id).to.equal('56b12b90d6bfe93733bece96');

      dispatch(advance({
        historyID: '56b12c59d6bfe93733bece97',
        userID: '562b748139c99dde22c6a499',
        playlistID: '563f390cf059363574f4d4dd',
        playedAt: new Date('2016-02-02T22:23:21.519Z').getTime(),
        media: {
          media: {
            _id: '569ac78a2b029e7d71a2ce43',
            sourceType: 'youtube',
            sourceID: '7SvxB_NL5cs',
            thumbnail: 'https://i.ytimg.com/vi/7SvxB_NL5cs/hqdefault.jpg',
            duration: 267,
          },
          artist: 'Eleanoora Rosenholm',
          title: 'Maailmanloppu',
          start: 0,
          end: 267,
        },
      }));

      expect(s.roomHistoryWithVotesSelector(getState())).to.have.length(2);
      expect(s.roomHistoryWithVotesSelector(getState())[1]._id).to.equal('56b12b90d6bfe93733bece96');

      expect(s.roomHistoryWithVotesSelector(getState())[0]._id).to.equal('56b12c59d6bfe93733bece97');
    });

    it('works with NULL advances', () => {
      const { dispatch, getState } = createStore();
      dispatch(loadHistoryComplete({
        data: [serverHistoryEntry],
        included: {
          user: [userModel],
          media: [mediaModel],
        },
        meta: {
          included: {
            media: ['media.media'],
            user: ['user'],
          },
          offset: 0,
          total: 1,
        },
      }));
      expect(s.roomHistorySelector(getState())).to.have.length(1);

      dispatch(advance());
      expect(s.roomHistorySelector(getState())).to.have.length(1);
    });
  });
});
