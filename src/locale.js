import i18next from 'i18next';

import cs from '../locale/cs.yaml';
import cy from '../locale/cy.yaml';
import de from '../locale/de.yaml';
import en from '../locale/en.yaml';
import fr from '../locale/fr.yaml';
import ko from '../locale/ko.yaml';
import nl from '../locale/nl.yaml';
import pt from '../locale/pt.yaml';
import zh from '../locale/zh.yaml';

const resources = {
  cs,
  cy,
  de,
  en,
  fr,
  ko,
  nl,
  pt,
  zh
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
    // Instantly return compiled-in locales.
    if (typeof resources[language] === 'object') {
      return Promise.resolve(resources[language]);
    }

    this.cache[language] = fetch(resources[language])
      .then(response => response.json());

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
    escapeValue: false
  }
});

export const availableLanguages = Object.keys(resources);

export default function createLocale(language) {
  const locale = i18next.cloneInstance();
  locale.changeLanguage(language);

  locale.availableLanguages = availableLanguages;

  return locale;
}
