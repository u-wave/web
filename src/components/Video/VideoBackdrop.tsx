/** Check if the browser supports the CSS `blur()` filter. */
function supportsBlur() {
  // Be conservative if we're not in the browser.
  if (typeof window === 'undefined' || !window.CSS || !window.CSS.supports) {
    return false;
  }

  return (
    // eslint-disable-next-line compat/compat
    CSS.supports('filter', 'blur(1em)') || CSS.supports('-webkit-filter', 'blur(1em)')
  );
}

type VideoBackdropProps = {
  url: string,
};
/** A Video backdrop, blurred using the CSS `blur()` filter. */
function CSSVideoBackdrop({ url }: VideoBackdropProps) {
  return (
    <img
      className="VideoBackdrop VideoBackdrop--blurry"
      src={url}
      alt=""
    />
  );
}

const svgWidth = 800;
const svgHeight = 480;
const svgBlur = 20;

/** A Video backdrop, blurred using an SVG filter. */
function SVGVideoBackdrop({ url }: VideoBackdropProps) {
  return (
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
}

// If the browser supports the CSS `blur()` filter, we can use the <img>-style
// backdrop. Otherwise, fall back to the SVG backdrop.
const VideoBackdrop = supportsBlur() ? CSSVideoBackdrop : SVGVideoBackdrop;

export default VideoBackdrop;
