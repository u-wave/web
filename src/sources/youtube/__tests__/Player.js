import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import YouTubePlayer from '../Player';

const fakeMedia = {
  sourceType: 'youtube',
  sourceID: 'fakeid',
  start: 0,
  end: 60,
};

describe('sources/youtube <Player />', () => {
  it('hides when the player is inactive', () => {
    const player = render(<YouTubePlayer active={false} />);
    expect(player.container.firstChild).not.toBeVisible();
    player.rerender(<YouTubePlayer active />);
    expect(player.container.firstChild).toBeVisible();
  });

  it('does not render an embed when video is disabled', () => {
    const player = render(<YouTubePlayer active enabled={false} />);
    expect(player.container.firstChild).toBeEmptyDOMElement();
  });

  it('does render an embed when video is enabled', () => {
    const player = render(<YouTubePlayer active enabled media={fakeMedia} />);
    expect(player.container.firstChild).not.toBeEmptyDOMElement();
  });

  it('still renders an embed when video is enabled, but YouTube is inactive', () => {
    const player = render(<YouTubePlayer active={false} enabled media={fakeMedia} />);
    expect(player.container.firstChild).not.toBeEmptyDOMElement();
  });
});
