/// <reference types="vite/client" />

declare module '*.yaml' {
  import type { JsonValue } from 'type-fest';

  const data: JsonValue;
  export default data;
}

declare module 'virtual:emoji-shortcodes' {
  const emojiShortcodes: Record<string, string>;
  export default emojiShortcodes;
}

declare module '@u-wave/translate' {
  import type { JsonObject } from 'type-fest';

  export default class Translator {
    constructor(values: JsonObject, options?: {
      plural?: (n: number) => number,
      default?: Translator,
    });

    t(i18nKey: string, props?: Record<string, string | number>): string;
  }
}

declare module '@u-wave/react-translate' {
  import Translator from '@u-wave/translate';

  export { Translator };
  export function useTranslator(): Translator;
  export function Interpolate(props: {
    i18nKey: string,
    [props: string]: React.ReactNode,
  }): JSX.Element;
  export function translate(): <P extends { t: Translator['t'] }>(component: React.ComponentClass<P>) => React.ComponentClass<Omit<P, 't'>>;
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

declare module 'react-abstract-autocomplete' {
  export type CompletionProps<C> = {
    trigger: string,
    minLength?: number,
    completions: C[],
    getCompletions?: (text: string, props: CompletionProps<C>) => C[],
    getText?: (completion: C, props: CompletionProps<C>) => string,
    renderSuggestion?: (props: {
      value: C,
      select: () => void,
      selected: boolean,
    }) => JSX.Element,
  }
  export type AutoCompleteProps = {
    inputProps?: React.ComponentPropsWithoutRef<'input'>,
    onUpdate: (value: string) => void,
    value: string,
    renderSuggestions?: (node: React.ReactNode) => JSX.Element,
    limit?: number,
    /** Must be Completion elements, technically */
    children: JSX.Element | JSX.Element[],
  }
  export function Completion<C>(props: CompletionProps<C>): JSX.Element;
  export default function AutoComplete(props: AutoCompleteProps): JSX.Element;
}
