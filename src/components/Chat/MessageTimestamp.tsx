import useIntl from '../../hooks/useIntl';

type MessageTimestampProps = {
  date: Date,
};
function MessageTimestamp({ date }: MessageTimestampProps) {
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

export default MessageTimestamp;
