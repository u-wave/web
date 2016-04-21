import * as React from 'react';

const supportsBlur = typeof window !== 'undefined' && window.CSS &&
  (CSS.supports('filter', 'blur(1em)') || CSS.supports('-webkit-filter', 'blur(1em)'));

const makeSvgString = url => {
  const width = 800;
  const height = 480;
  const blur = 20;
  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      viewBox="0 0 ${width} ${height}"
    >
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation="${blur} ${blur}" result="blur" />
        </filter>
      </defs>
      <image
        xlink:href="${url}"
        x="${blur * -3}"
        y="${blur * -3}"
        filter="url(#blur)"
        width="${width + blur * 6}"
        height="${height + blur * 6}"
      />
    </svg>
  `.replace(/\s+/g, ' ').trim();
};

const VideoBackdrop = ({ url }) => {
  if (!supportsBlur) {
    const svg = { __html: makeSvgString(url) };
    return (
      <div
        className="VideoBackdrop VideoBackdrop--svg"
        dangerouslySetInnerHTML={svg}
      />
    );
  }
  return <img className="VideoBackdrop VideoBackdrop--blurry" src={url} alt="" />;
};

VideoBackdrop.propTypes = {
  url: React.PropTypes.string.isRequired
};

export default VideoBackdrop;
