import cx from 'clsx';
import YouTube from '@u-wave/react-youtube';
import { useCallback } from 'react';
import { Media } from '../../reducers/booth';

type YouTubePlayerProps = {
  active: boolean,
  className?: string,
  enabled: boolean,
  mode: 'small' | 'large' | 'preview',
  media: Media | null,
  seek: number,
  volume: number,
  onPlay: () => void,
};

function YouTubePlayer({
  active,
  className,
  enabled,
  mode,
  media,
  seek,
  volume,
  onPlay,
}: YouTubePlayerProps) {
  const modeClass = `src-youtube-Player--${mode}`;
  const controllable = mode === 'preview';

  const handlePause = useCallback((event: YT.OnStateChangeEvent) => {
    if (active && !controllable) {
      event.target.playVideo();
    }
  }, [active, controllable]);

  return (
    <div className={cx('src-youtube-Player', modeClass, className)} hidden={!active}>
      {enabled && (
        <YouTube
          video={active ? media.sourceID : null}
          width="100%"
          height="100%"
          autoplay
          modestBranding
          disableKeyboard
          volume={volume / 100}
          playbackRate={1}
          controls={controllable}
          showRelatedVideos={false}
          annotations={false}
          startSeconds={Math.round(seek + (media.start ?? 0))}
          endSeconds={media.end ?? media.duration}
          onPause={handlePause}
          onPlaying={onPlay}
        />
      )}
    </div>
  );
}

export default YouTubePlayer;
