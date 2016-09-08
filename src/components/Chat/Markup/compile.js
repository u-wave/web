import * as React from 'react';

import Bold from './Bold';
import Code from './Code';
import Italic from './Italic';
import StrikeThrough from './StrikeThrough';
import Mention from './Mention';
import GroupMention from './GroupMention';
import Link from './Link';
import Emoji from './Emoji';

export default function compile(tree, opts = {}) {
  const {
    availableEmoji = [],
    emojiImages = {}
  } = opts;

  return tree.map((node, i) => {
    if (typeof node === 'string') {
      return node;
    }

    switch (node.type) {
    case 'mention':
      return node.user
        ? <Mention key={i} user={node.user} />
        : <GroupMention key={i} group={node.mention} users={node.group} />;
    case 'link':
      // the "text" property is content
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <Link key={i} text={node.text} href={node.href} />;
    case 'emoji':
      if (availableEmoji.indexOf(node.name) !== -1 && node.name in emojiImages) {
        return (
          <Emoji
            key={i}
            name={node.name}
            image={emojiImages[node.name]}
          />
        );
      }
      return `:${node.name}:`;
    case 'italic':
      return <Italic key={i}>{compile(node.content, opts)}</Italic>;
    case 'bold':
      return <Bold key={i}>{compile(node.content, opts)}</Bold>;
    case 'code':
      return <Code key={i}>{compile(node.content, opts)}</Code>;
    case 'strike':
      return <StrikeThrough key={i}>{compile(node.content, opts)}</StrikeThrough>;
    default:
      return compile(node.content, opts);
    }
  });
}
