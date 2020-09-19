import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Video from '..';

function noop() {}

describe('mobile <Video />', () => {
  it('should show empty player when media is null', () => {
    expect(() => shallow((
      <Video
        media={null}
        onUpvote={noop}
        onDownvote={noop}
        onFavorite={noop}
      />
    ))).not.toThrow();
  });
});
