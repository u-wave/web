import { useTranslator } from '@u-wave/react-translate';
import type { User } from '../../reducers/users';

type CurrentDJProps = {
  className?: string,
  dj: User,
};

function CurrentDJ({ className, dj }: CurrentDJProps) {
  const { t } = useTranslator();

  return (
    <div className={className}>
      {t('booth.currentDJ', { user: dj.username })}
    </div>
  );
}

export default CurrentDJ;
