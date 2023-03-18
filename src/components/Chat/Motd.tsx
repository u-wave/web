import React from 'react';
import type { MarkupNode } from 'u-wave-parse-chat-markup';
import Markup, { type CompileOptions } from './Markup';

type MotdProps = {
  children: MarkupNode[],
  compileOptions: CompileOptions,
};
function Motd({ children, compileOptions }: MotdProps) {
  return (
    <div className="ChatMessage ChatMessage--motd">
      <div className="ChatMessage-content">
        <Markup tree={children} compileOptions={compileOptions} />
      </div>
    </div>
  );
}

export default React.memo(Motd);
