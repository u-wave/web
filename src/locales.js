import en from '../locale/en.yaml';

const modules = import.meta.glob(['../locale/*.yaml', '!../locale/en.yaml']);

export const resources = Object.fromEntries(
  Object.entries(modules)
    .map(([path, loader]) => [/\/(\w+)\.yaml$/.exec(path)[1], loader])
    .concat([['en', () => en]]),
);

export const availableLanguages = Object.keys(resources);
