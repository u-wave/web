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
};
function CircularProgress({ className, size, color }: CircularProgressProps) {
  return (
    <svg
      fill="none"
      className={cx('CircularProgress', className)}
      style={size != null || color != null ? { width: size, height: size, '--spinner-color': color } : undefined}
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
        strokeWidth="4"
      />
    </svg>
  );
}

export default CircularProgress;
