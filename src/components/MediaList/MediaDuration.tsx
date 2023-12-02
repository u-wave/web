import formatDuration from 'format-duration';

type MediaDurationProps = {
  media: {
    duration: number,
  } & ({
    start: number,
    end: number
  } | {
    start?: undefined,
    end?: undefined,
  })
}
function MediaDuration({ media }: MediaDurationProps) {
  const duration = 'start' in media && media.start != null
    // playlist item
    ? media.end - media.start
    // search result
    : media.duration;

  return <>{formatDuration(duration * 1000)}</>;
}

export default MediaDuration;
