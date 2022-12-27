import en from '../locale/en.yaml';

const modules = process.env.NODE_ENV === 'test'
  ? {}
  : import.meta.glob(['../locale/*.yaml', '!../locale/en.yaml']);

export const resources = Object.fromEntries(
  [['en', () => en]].concat(
    Object.entries(modules)
      .map(([path, loader]) => [/\/(\w+)\.yaml$/.exec(path)[1], loader]),
  ),
);

export const availableLanguages = Object.keys(resources);
