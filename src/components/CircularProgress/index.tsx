import cx from 'clsx';

declare module 'react' {
  interface CSSProperties {
    '--spinner-color'?: string;
  }
}

type CircularProgressProps = {
  className?: string,
  size?: number | string,
  color?: string,
  thickness?: number,
};
function CircularProgress({
  className,
  size = 40,
  color,
  thickness = 3.6,
}: CircularProgressProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
  }
  if (color != null) {
    style['--spinner-color'] = color
  }

  return (
    <svg
      fill="none"
      className={cx('CircularProgress', className)}
      style={style}
      viewBox="0 0 66 66"
    >
      <circle
        className="CircularProgress-spin"
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={thickness}
      />
    </svg>
  );
}

export default CircularProgress;
