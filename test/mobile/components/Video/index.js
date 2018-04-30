import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Video from '../../../../src/mobile/components/Video';

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
    ))).not.to.throw();
  });
});
