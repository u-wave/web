import cx from 'clsx';
import formatDuration from 'format-duration';
import useClock from '../../hooks/useClock';

type EtaProps = {
  className?: string,
  base: number,
  endTime: number,
};
function Eta({ className, base, endTime }: EtaProps) {
  const currentTime = useClock();
  const currentRemaining = endTime - currentTime;
  return (
    <span className={cx('Eta', className)}>
      {formatDuration(base + currentRemaining)}
    </span>
  );
}

export default Eta;
