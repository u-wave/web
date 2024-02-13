import cx from 'clsx';
import { useTranslator } from '@u-wave/react-translate';
import {
  mdiHeart,
  mdiHeartOutline,
  mdiThumbDown,
  mdiThumbUp,
} from '@mdi/js';
import Tooltip from '@mui/material/Tooltip';
import SvgIcon from '../SvgIcon';

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
  count: number,
  children: React.ReactNode,
  tooltip: string,
};
function Button({
  onClick,
  disabled,
  count,
  children,
  tooltip,
}: ButtonProps) {
  return (
    // Wrapped in a <div> so the tooltip can listen for mouse events.
    <Tooltip title={tooltip} placement="top">
      <div className="ResponseButton-wrap">
        <button
          type="button"
          className={cx('ResponseButton', disabled && 'ResponseButton--disabled')}
          disabled={disabled}
          onClick={onClick}
        >
          <div className="ResponseButton-content">
            <div className="ResponseButton-icon">{children}</div>
            <span className="ResponseButton-count">{count}</span>
          </div>
        </button>
      </div>
    </Tooltip>
  );
}

type ResponseBarProps = {
  disabled?: boolean,
  isUpvote: boolean,
  upvotesCount: number,
  onUpvote: () => void,
  isDownvote: boolean,
  downvotesCount: number,
  onDownvote: () => void,
  isFavorite: boolean,
  favoritesCount: number,
  onFavorite: (position: { x: number, y: number }) => void,
}
function ResponseBar({
  disabled = false,
  isUpvote, upvotesCount, onUpvote,
  isDownvote, downvotesCount, onDownvote,
  isFavorite, favoritesCount, onFavorite,
}: ResponseBarProps) {
  const { t } = useTranslator();

  return (
    <div className="AudienceResponse">
      <Button
        disabled={disabled}
        tooltip={t('votes.upvote')}
        onClick={onUpvote}
        count={upvotesCount}
      >
        <SvgIcon
          path={mdiThumbUp}
          className={isUpvote ? 'ResponseButton-icon--upvoted' : ''}
        />
      </Button>
      <Button
        disabled={disabled}
        tooltip={t('votes.favorite')}
        onClick={(event) => {
          const pos = event.currentTarget.getBoundingClientRect();
          onFavorite({
            x: pos.left,
            y: pos.top,
          });
        }}
        count={favoritesCount}
      >
        <SvgIcon
          path={isFavorite ? mdiHeart : mdiHeartOutline}
          className="ResponseButton-icon--favorite"
        />
      </Button>
      <Button
        disabled={disabled}
        tooltip={t('votes.downvote')}
        onClick={onDownvote}
        count={downvotesCount}
      >
        <SvgIcon
          path={mdiThumbDown}
          className={isDownvote ? 'ResponseButton-icon--downvoted' : ''}
        />
      </Button>
    </div>
  );
}

export default ResponseBar;
