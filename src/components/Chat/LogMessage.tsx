import { memo } from 'react';

type LogMessageProps = {
  text: string,
};
function LogMessage({ text }: LogMessageProps) {
  return (
    <div className="ChatMessage ChatMessage--log">
      <div className="ChatMessage-content">
        <span className="ChatMessage-text">{text}</span>
      </div>
    </div>
  );
}

export default memo(LogMessage);
