import { memo } from 'react';
import { useMediaSources } from '../../context/MediaSourceContext';

type MediaSourceIconProps = {
  sourceType: string,
};
function MediaSourceIcon({ sourceType }: MediaSourceIconProps) {
  const { getMediaSource } = useMediaSources();
  const source = getMediaSource(sourceType);
  if (!source) {
    return null;
  }

  const { icon, name } = source;

  return (
    <img
      height="20dp"
      src={icon.toString()}
      alt={name}
    />
  );
}

export default memo(MediaSourceIcon);
