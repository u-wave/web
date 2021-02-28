import en from '../locale/en.yaml';

function fetchLocale(url) {
  let cache;
  return () => {
    if (!cache) {
      cache = fetch(url).then((response) => response.json());
    }
    return cache;
  };
}

export const resources = {
  en: () => Promise.resolve(en),
  cs: fetchLocale(new URL('../locale/cs.yaml', import.meta.url)),
  cy: fetchLocale(new URL('../locale/cy.yaml', import.meta.url)),
  de: fetchLocale(new URL('../locale/de.yaml', import.meta.url)),
  es: fetchLocale(new URL('../locale/es.yaml', import.meta.url)),
  fr: fetchLocale(new URL('../locale/fr.yaml', import.meta.url)),
  ko: fetchLocale(new URL('../locale/ko.yaml', import.meta.url)),
  nl: fetchLocale(new URL('../locale/nl.yaml', import.meta.url)),
  pt: fetchLocale(new URL('../locale/pt.yaml', import.meta.url)),
  zh: fetchLocale(new URL('../locale/zh.yaml', import.meta.url)),
  ru: fetchLocale(new URL('../locale/ru.yaml', import.meta.url)),
};

export const availableLanguages = Object.keys(resources);
