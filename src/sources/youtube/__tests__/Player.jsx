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
    const { container, rerender } = render(<YouTubePlayer active={false} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).not.toBeVisible();
    rerender(<YouTubePlayer active />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeVisible();
  });

  it('does not render an embed when video is disabled', () => {
    const { container } = render(<YouTubePlayer active enabled={false} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('does render an embed when video is enabled', () => {
    const { container } = render(<YouTubePlayer active enabled media={fakeMedia} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).not.toBeEmptyDOMElement();
  });

  it('still renders an embed when video is enabled, but YouTube is inactive', () => {
    const { container } = render(<YouTubePlayer active={false} enabled media={fakeMedia} />);
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).not.toBeEmptyDOMElement();
  });
});
