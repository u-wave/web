import React from 'react';

import Bold from './Bold';
import Code from './Code';
import Italic from './Italic';
import StrikeThrough from './StrikeThrough';
import Mention from './Mention';
import Link from './Link';
import Emoji from './Emoji';

export default function compile(tree) {
  return tree.map((node, i) => {
    if (typeof node === 'string') {
      return node;
    } else if (node.type === 'mention') {
      return <Mention key={i} user={node.user} />;
    } else if (node.type === 'link') {
      return <Link key={i} text={node.text} href={node.href} />;
    } else if (node.type === 'emoji') {
      return <Emoji key={i} name={node.name} />;
    }

    switch (node.type) {
    case 'italic':
      return <Italic key={i}>{compile(node.content)}</Italic>;
    case 'bold':
      return <Bold key={i}>{compile(node.content)}</Bold>;
    case 'code':
      return <Code key={i}>{compile(node.content)}</Code>;
    case 'strike':
      return <StrikeThrough key={i}>{compile(node.content)}</StrikeThrough>;
    default:
      return compile(node.content);
    }
  });
}
