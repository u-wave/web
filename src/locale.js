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

i18next.init({
  fallbackLng: 'en',
  defaultNS: 'uwave',
  resources,
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
