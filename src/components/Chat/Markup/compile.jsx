import React from 'react';
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
    availableEmoji = new Set(),
    customEmojiNames = new Set(),
    emojiImages = {},
  } = opts;

  // Display large emoji if a message only contains emoji and separating whitespace
  const useLargeEmoji = tree.length < 10 && tree.every((node) => (
    (typeof node === 'string' && /^\s*$/.test(node)) || node.type === 'emoji'
  ));

  return tree.map((node, i) => {
    if (typeof node === 'string') {
      return node;
    }

    /* eslint-disable react/no-array-index-key */
    switch (node.type) {
      case 'mention':
        return node.user
          ? <Mention key={i} user={node.user} />
          : <GroupMention key={i} group={node.mention} users={node.group} />;
      case 'link':
        return <Link key={i} href={node.href}>{node.text}</Link>;
      case 'emoji':
        if (availableEmoji.has(node.name) && node.name in emojiImages) {
          return (
            <Emoji
              key={i}
              name={node.name}
              image={emojiImages[node.name]}
              isCustom={customEmojiNames.has(node.name)}
              isLarge={useLargeEmoji}
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
    /* eslint-enable react/no-array-index-key */
  });
}
