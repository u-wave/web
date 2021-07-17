import React from 'react';
import { render } from '@testing-library/react';
import MediaSourceContext from '../../../../context/MediaSourceContext';
import Video from '..';

function noop() {}

describe('mobile <Video />', () => {
  it('should show empty player when media is null', () => {
    expect(() => render((
      <MediaSourceContext.Provider mediaSources={{}}>
        <Video
          media={null}
          onUpvote={noop}
          onDownvote={noop}
          onFavorite={noop}
        />
      </MediaSourceContext.Provider>
    ))).not.toThrow();
  });
});
