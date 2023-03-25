import { useMemo } from 'react';
import useSWR from 'swr';
import { useSelector } from './useRedux';
import defaultEmoji from '../utils/emojiShortcodes';

type ServerEmote = {
  name: string,
  url: string,
};

function useEmotes() {
  const { data: serverEmotes } = useSWR<ServerEmote[]>('/emotes', async (url: string) => {
    const response = await fetch(url);
    const { data } = await response.json();
    return data;
  }, {
    revalidateOnFocus: false,
    fallbackData: [],
  });

  const configEmoji = useSelector((state) => state.config.emoji);

  const emotes: Record<string, string> = useMemo(() => ({
    ...defaultEmoji,
    ...configEmoji,
    ...Object.fromEntries(serverEmotes.map(({ name, url }) => [name, url])),
  }), [configEmoji, serverEmotes]);

  return emotes;
}

export default useEmotes;
