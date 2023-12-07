import cx from 'clsx';
import { useMediaSources } from '../../../context/MediaSourceContext';

type ImportSourceBlockProps = {
  className?: string,
  sourceType: string,
  title: string,
  children: React.ReactNode,
};
function ImportSourceBlock({
  className,
  sourceType,
  title,
  children,
}: ImportSourceBlockProps) {
  const { getMediaSource } = useMediaSources();
  const source = getMediaSource(sourceType);
  if (!source) {
    // FIXME should this do something else?
    return null;
  }

  return (
    <div className={cx('ImportSourceBlock', 'PlaylistImport-source', className)}>
      <img
        className="ImportSourceBlock-image"
        alt={title}
        title={title}
        src={source.logo.toString()}
      />
      {children}
    </div>
  );
}

export default ImportSourceBlock;
