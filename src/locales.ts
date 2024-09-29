import type { JsonValue } from 'type-fest';
import en from '../locale/en.yaml';

const modules = process.env.NODE_ENV === 'test'
  ? {}
  : import.meta.glob(['../locale/*.yaml', '!../locale/en.yaml']) as Record<string, () => Promise<JsonValue>>;

export const resources = Object.fromEntries(
  [['en', () => Promise.resolve(en)] as [string, () => Promise<JsonValue>]].concat(
    Object.entries(modules)
      .map(([path, loader]) => [/\/(\w+)\.yaml$/.exec(path)![1]!, loader]),
  ),
);

export const availableLanguages = Object.keys(resources);
