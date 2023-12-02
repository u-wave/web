import { useMemo } from 'react';
import useSWR from 'swr';
import { useSelector } from './useRedux';
import defaultEmoji from '../utils/emojiShortcodes';
import uwFetch, { ListResponse } from '../utils/fetch';

type ServerEmote = {
  name: string,
  url: string,
};

function useEmotes() {
  const { data: serverEmotes } = useSWR<ListResponse<ServerEmote>>('/emotes', uwFetch, {
    revalidateOnFocus: false,
  });

  const configEmoji = useSelector((state) => state.config.emoji);

  const emotes: Record<string, string> = useMemo(() => ({
    ...defaultEmoji,
    ...configEmoji,
    ...(serverEmotes
      ? Object.fromEntries(serverEmotes.data.map(({ name, url }) => [name, url]))
      : undefined),
  }), [configEmoji, serverEmotes]);

  return emotes;
}

export default useEmotes;
