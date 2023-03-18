import cx from 'clsx';
import shortenUrl from 'shorten-url';
import type { MarkupNode, MentionNode } from 'u-wave-parse-chat-markup';
import Tooltip from '@mui/material/Tooltip';
import emojiUrl from '../../utils/emojiUrl';
import { User } from '../../reducers/users';

export type CompileOptions = {
  availableEmoji?: Set<string>,
  customEmojiNames?: Set<string>,
  emojiImages?: Record<string, string>,
};

type EmoteProps = {
  name: string,
  image: string,
  isCustom: boolean,
  isLarge: boolean,
};
function Emote({
  name,
  image,
  isCustom,
  isLarge,
}: EmoteProps) {
  return (
    <Tooltip title={`:${name}:`} placement="top">
      <span className={cx('Emoji', isLarge && 'Emoji--large', isCustom && 'Emoji--custom')} data-emoji={name}>
        <img
          className="Emoji-img"
          src={emojiUrl(image, isCustom).href}
          alt={`:${name}:`}
        />
      </span>
    </Tooltip>
  );
}

type RenderMarkupProps = {
  tree: MarkupNode[],
  compileOptions: Required<CompileOptions>,
  useLargeEmoji: boolean,
};
function RenderMarkup({ tree, compileOptions, useLargeEmoji }: RenderMarkupProps) {
  const { availableEmoji, customEmojiNames, emojiImages } = compileOptions;

  return (
    <>
      {tree.map((node) => {
        if (typeof node === 'string') {
          return node;
        }

        switch (node.type) {
          case 'mention': {
            const mention = node as MentionNode & {
              user?: User,
              group?: User[],
            };
            return (
              <span className={cx('ChatMention', mention.user ? null : `ChatMention--${mention.mention}`)}>
                @{mention.user?.username ?? mention.mention}
              </span>
            );
          }
          case 'link':
            return (
              <a
                href={node.href}
                title={node.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortenUrl(node.text, 60)}
              </a>
            );
          case 'emoji':
            if (availableEmoji.has(node.name) && node.name in emojiImages) {
              return (
                <Emote
                  name={node.name}
                  image={emojiImages[node.name]}
                  isCustom={customEmojiNames.has(node.name)}
                  isLarge={useLargeEmoji}
                />
              );
            }
            return `:${node.name}:`;
          case 'italic':
            return (
              <em>
                <RenderMarkup
                  tree={node.content}
                  compileOptions={compileOptions}
                  useLargeEmoji={useLargeEmoji}
                />
              </em>
            );
          case 'bold':
            return (
              <strong>
                <RenderMarkup
                  tree={node.content}
                  compileOptions={compileOptions}
                  useLargeEmoji={useLargeEmoji}
                />
              </strong>
            );
          case 'code':
            return (
              <code>{node.content[0]}</code>
            );
          case 'strike':
            return (
              <s>
                <RenderMarkup
                  tree={node.content}
                  compileOptions={compileOptions}
                  useLargeEmoji={useLargeEmoji}
                />
              </s>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

type MarkupProps = {
  tree: MarkupNode[],
  compileOptions: CompileOptions,
};
function Markup({ tree, compileOptions }: MarkupProps) {
  const compileOptionsWithDefaults: Required<CompileOptions> = {
    availableEmoji: new Set(),
    customEmojiNames: new Set(),
    emojiImages: {},
    ...compileOptions,
  };

  // Display large emoji if a message only contains emoji and separating whitespace
  const useLargeEmoji = tree.length < 10 && tree.every((node) => (
    (typeof node === 'string' && /^\s*$/.test(node)) || (typeof node !== 'string' && node.type === 'emoji')
  ));

  return (
    <RenderMarkup
      tree={tree}
      compileOptions={compileOptionsWithDefaults}
      useLargeEmoji={useLargeEmoji}
    />
  );
}

export default Markup;
