import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import YouTubePlayer from '../../../src/sources/youtube/Player';
import YouTubeEmbed from '../../../src/sources/youtube/PlayerEmbed';

describe('sources/youtube <Player />', () => {
  it('hides when the player is inactive', () => {
    expect(shallow(<YouTubePlayer active={false} />)).to.have.prop('hidden', true);
    expect(shallow(<YouTubePlayer active />)).to.have.prop('hidden', false);
  });

  it('does not render an embed when video is disabled', () => {
    expect(shallow(<YouTubePlayer active enabled={false} />).find(YouTubeEmbed)).to.have.length(0);
  });

  it('does render an embed when video is enabled', () => {
    expect(shallow(<YouTubePlayer active enabled />).find(YouTubeEmbed)).to.have.length(1);
  });

  it('still renders an embed when video is enabled, but YouTube is inactive', () => {
    expect(shallow(<YouTubePlayer active={false} enabled />).find(YouTubeEmbed)).to.have.length(1);
  });
});
