import qsStringify from 'qs-stringify';

const createEmbedUrl = (sourceID: string) => (
  `https://w.soundcloud.com/player/?${qsStringify({
    url: `https://api.soundcloud.com/tracks/${sourceID}`,
    color: '55B9FF',
    auto_play: 'true',
    hide_related: 'true',
    buying: 'false',
    liking: 'false',
    download: 'false',
    sharing: 'false',
    show_comments: 'false',
    visual: 'true',
  })} `
);

type PreviewPlayerProps = {
  media: { sourceID: string },
};
function PreviewPlayer({ media }: PreviewPlayerProps) {
  return (
    <iframe
      title="SoundCloud Embed"
      width="640"
      height="360"
      scrolling="no"
      frameBorder="no"
      src={createEmbedUrl(media.sourceID)}
    />
  );
}

export default PreviewPlayer;
