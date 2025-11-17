import type { MarkupNode } from 'u-wave-parse-chat-markup';
import Markup from './Markup';

type MotdProps = {
  children: MarkupNode[],
};
function Motd({ children }: MotdProps) {
  return (
    <div className="ChatMessage ChatMessage--motd">
      <div className="ChatMessage-content">
        <Markup tree={children} />
      </div>
    </div>
  );
}

export default Motd;
