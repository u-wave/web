import { memo } from 'react';

type MediaThumbnailProps = {
  url: string,
};
function MediaThumbnail({ url }: MediaThumbnailProps) {
  return (
    <div className="MediaListRow-thumb">
      <img
        className="MediaListRow-image"
        src={url}
        alt=""
        loading="lazy"
      />
    </div>
  );
}

export default memo(MediaThumbnail);
