import cx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import type { MarkupNode } from 'u-wave-parse-chat-markup';
import type { User } from '../../reducers/users';
import useUserCard from '../../hooks/useUserCard';
import useIntl from '../../hooks/useIntl';
import Avatar from '../Avatar';
import Username from '../Username';
import Markup, { CompileOptions } from './Markup';

type DeleteButtonProps = {
  onDelete: () => void,
};
function DeleteButton({ onDelete }: DeleteButtonProps) {
  return (
    <button
      type="button"
      className="ChatMessage-delete"
      onClick={onDelete}
    >
      Delete
    </button>
  );
}

type MessageTimestampProps = {
  date: Date,
};
function MessageTimestampImpl({ date }: MessageTimestampProps) {
  const { timeFormatter } = useIntl();

  return (
    <time
      className="ChatMessage-timestamp"
      dateTime={date.toISOString()}
    >
      {timeFormatter.format(date)}
    </time>
  );
}
const MessageTimestamp = memo(MessageTimestampImpl);

type ChatMessageProps = {
  _id: string,
  user: User,
  text: string,
  parsedText?: MarkupNode[],
  inFlight?: boolean,
  isMention?: boolean,
  timestamp: number,
  compileOptions: CompileOptions,
  deletable?: boolean,
  onDelete?: (id: string) => void,
};

function ChatMessage({
  _id: id,
  user,
  text,
  parsedText,
  inFlight = false,
  isMention = false,
  timestamp,
  compileOptions,
  deletable,
  onDelete,
}: ChatMessageProps) {
  const userCard = useUserCard(user);
  const onUsernameClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    userCard.open();
    // The `userCard.open` reference never changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let avatar: React.ReactNode;
  if (inFlight) {
    avatar = (
      <div className="ChatMessage-avatar">
        <CircularProgress size="100%" />
      </div>
    );
  } else {
    avatar = (
      <Avatar
        className="ChatMessage-avatar"
        user={user}
      />
    );
  }

  const children = parsedText ? <Markup tree={parsedText} compileOptions={compileOptions} /> : text;

  const date = useMemo(() => new Date(timestamp), [timestamp]);

  const className = cx({
    ChatMessage: true,
    'ChatMessage--loading': inFlight,
    'ChatMessage--mention': isMention,
  });
  return (
    <div className={className} ref={userCard.refAnchor}>
      {userCard.card}
      {avatar}
      <div className="ChatMessage-content">
        <div className="ChatMessage-hover">
          {deletable && <DeleteButton onDelete={() => onDelete?.(id)} />}
          <MessageTimestamp date={date} />
        </div>
        <button
          type="button"
          className="ChatMessage-username ChatMessage-cardable"
          onClick={onUsernameClick}
        >
          <Username user={user} />
        </button>
        <span className="ChatMessage-text">{children}</span>
      </div>
    </div>
  );
}

export default ChatMessage;
