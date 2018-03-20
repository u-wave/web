import i18next from 'i18next';
import * as en from '../locale/en.yaml';

const resources = {
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

class UwaveBackend {
  static type = 'backend';
  type = 'backend';
  cache = {};

  getResource(language) {
    if (this.cache[language]) {
      return this.cache[language];
    }
    if (!resources[language]) {
      return Promise.reject(new Error(`The language "${language}" is not supported.`));
    }

    this.cache[language] = resources[language]();

    return this.cache[language];
  }

  read(language, namespace, callback) {
    this.getResource(language)
      .then(resource => resource[namespace])
      .then((result) => {
        callback(null, result);
      })
      .catch(callback);
  }
}

i18next.use(new UwaveBackend());

i18next.init({
  fallbackLng: 'en',
  defaultNS: 'uwave',
  interpolation: {
    // Prevent double-escapes: React already escapes things for us
    escapeValue: false,
  },
});

// Synchronously add the fallback language.
i18next.addResourceBundle('en', 'uwave', en.uwave);

export const availableLanguages = ['en', ...Object.keys(resources)];

export default function createLocale(language) {
  const locale = i18next.cloneInstance();
  locale.availableLanguages = availableLanguages;

  return new Promise((resolve) => {
    locale.changeLanguage(language, () => {
      resolve(locale);
    });
  });
}
