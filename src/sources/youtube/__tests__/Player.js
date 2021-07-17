import React from 'react';
import { shallow } from 'enzyme';
import YouTubePlayer from '../Player';
import YouTubeEmbed from '../PlayerEmbed';

describe('sources/youtube <Player />', () => {
  it('hides when the player is inactive', () => {
    expect(shallow(<YouTubePlayer active={false} />).props()).toHaveProperty('hidden', true);
    expect(shallow(<YouTubePlayer active />).props()).toHaveProperty('hidden', false);
  });

  it('does not render an embed when video is disabled', () => {
    expect(shallow(<YouTubePlayer active enabled={false} />).find(YouTubeEmbed)).toHaveLength(0);
  });

  it('does render an embed when video is enabled', () => {
    expect(shallow(<YouTubePlayer active enabled />).find(YouTubeEmbed)).toHaveLength(1);
  });

  it('still renders an embed when video is enabled, but YouTube is inactive', () => {
    expect(shallow(<YouTubePlayer active={false} enabled />).find(YouTubeEmbed)).toHaveLength(1);
  });
});
