import { useTranslator } from '@u-wave/react-translate';
import SongTitle from '../SongTitle';
import type { Media } from '../../reducers/booth';

type CurrentMediaProps = {
  className?: string,
  media?: Media | null,
};

function CurrentMedia({ className, media }: CurrentMediaProps) {
  const { t } = useTranslator();

  return (
    <div className={className}>
      {media
        ? <SongTitle artist={media.artist} title={media.title} />
        : t('booth.empty')}
    </div>
  );
}

export default CurrentMedia;
