import * as React from 'react';

/**
 * Check if the browser supports the CSS `blur()` filter.
 */
function supportsBlur() {
  // Be conservative if we're not in the browser.
  if (typeof window === 'undefined' || !window.CSS) {
    return false;
  }

  return (
    CSS.supports('filter', 'blur(1em)') ||
    CSS.supports('-webkit-filter', 'blur(1em)')
  );
}

/**
 * A Video backdrop, blurred using the CSS `blur()` filter.
 */
const CSSVideoBackdrop = ({ url }) => (
  <img
    className="VideoBackdrop VideoBackdrop--blurry"
    src={url}
    alt=""
  />
);

CSSVideoBackdrop.propTypes = {
  url: React.PropTypes.string.isRequired
};

const svgWidth = 800;
const svgHeight = 480;
const svgBlur = 20;

/**
 * A Video backdrop, blurred using an SVG filter.
 */
const SVGVideoBackdrop = ({ url }) => (
  <div className="VideoBackdrop VideoBackdrop--svg">
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
      <defs>
        <filter id="blur">
          <feGaussianBlur stdDeviation={`${svgBlur} ${svgBlur}`} result="blur" />
        </filter>
      </defs>
      <image
        xlinkHref={url}
        x={svgBlur * -3}
        y={svgBlur * -3}
        filter="url(#blur)"
        width={svgWidth + (svgBlur * 6)}
        height={svgHeight + (svgBlur * 6)}
      />
    </svg>
  </div>
);

SVGVideoBackdrop.propTypes = {
  url: React.PropTypes.string.isRequired
};

// If the browser supports the CSS `blur()` filter, we can use the <img>-style
// backdrop. Otherwise, fall back to the SVG backdrop.
const VideoBackdrop = supportsBlur() ? CSSVideoBackdrop : SVGVideoBackdrop;

export default VideoBackdrop;
