import { memo } from 'react';
import { useMediaSources } from '../../context/MediaSourceContext';

type MediaSourceIconProps = {
  sourceType: string,
};
function MediaSourceIcon({ sourceType }: MediaSourceIconProps) {
  const { getMediaSource } = useMediaSources();
  const { icon, name } = getMediaSource(sourceType);

  return (
    <img
      height="20dp"
      src={icon}
      alt={name}
    />
  );
}

export default memo(MediaSourceIcon);
