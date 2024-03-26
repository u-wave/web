declare module '*.ico' {
  const url: string;
  export default url;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.yaml' {
  const data: object;
  export default data;
}

declare module 'virtual:emoji-shortcodes' {
  const emojiShortcodes: Record<string, string>;
  export default emojiShortcodes;
}

declare module '@u-wave/react-translate' {
  import { Translator } from '@u-wave/translate';

  export function useTranslator(): Translator;
  export function Interpolate(props: {
    i18nKey: string,
    [props: string]: React.ReactNode,
  }): JSX.Element;
}

declare module 'item-selection/immutable' {
  export interface ItemSelection<T> {
    getIndices(): number[];
    get(): T[];
    set(selection: number[], lastIndex?: number): this;
    isSelectedIndex(index: number): boolean;
    isSelected(item: T): boolean;
    clear(): this;
    add(index: number): this;
    remove(index: number): this;
    select(index: number): this;
    deselect(index: number): this;
    selectRange(index: number, end?: number): this;
    selectToggle(index: number): this;
    selectAll(): this;
  }
  export default function itemSelection<T>(items: T[], selection?: number[]): ItemSelection<T>;
}

declare module 'splitargs' {
  function splitargs(input: string, sep?: RegExp, keepQuotes?: boolean): string[];
  export = splitargs;
}

declare module 'flash-document-title' {
  function flashDocumentTitle(input: string): void;
  export = flashDocumentTitle;
}
