import en from '../locale/en.yaml';

export const resources = {
  en: () => Promise.resolve(en),
  cs: () => import('../locale/cs.yaml'),
  cy: () => import('../locale/cy.yaml'),
  de: () => import('../locale/de.yaml'),
  es: () => import('../locale/es.yaml'),
  fr: () => import('../locale/fr.yaml'),
  ko: () => import('../locale/ko.yaml'),
  nl: () => import('../locale/nl.yaml'),
  pt: () => import('../locale/pt.yaml'),
  zh: () => import('../locale/zh.yaml'),
};

export const availableLanguages = Object.keys(resources);
