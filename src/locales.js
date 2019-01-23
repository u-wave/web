import * as en from '../locale/en.yaml';

export const resources = {
  en: () => Promise.resolve(en),
  cs: () => import('../locale/cs.yaml' /* webpackChunkName: "lang_cs" */),
  cy: () => import('../locale/cy.yaml' /* webpackChunkName: "lang_cy" */),
  de: () => import('../locale/de.yaml' /* webpackChunkName: "lang_de" */),
  es: () => import('../locale/es.yaml' /* webpackChunkName: "lang_es" */),
  fr: () => import('../locale/fr.yaml' /* webpackChunkName: "lang_fr" */),
  ko: () => import('../locale/ko.yaml' /* webpackChunkName: "lang_ko" */),
  nl: () => import('../locale/nl.yaml' /* webpackChunkName: "lang_nl" */),
  pt: () => import('../locale/pt.yaml' /* webpackChunkName: "lang_pt" */),
  zh: () => import('../locale/zh.yaml' /* webpackChunkName: "lang_zh" */),
};

export const availableLanguages = Object.keys(resources);
