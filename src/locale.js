import i18next from 'i18next';

import * as en from '../locale/en.yaml';
import * as nl from '../locale/nl.yaml';

export default function createLocale(language) {
  const resources = { en, nl };

  i18next.init({
    lng: language,
    fallbackLng: 'en',
    defaultNS: 'uwave',
    resources,
    interpolation: {
      // Prevent double-escapes: React already escapes things for us
      escapeValue: false
    }
  });

  i18next.availableLanguages = Object.keys(resources);

  return i18next;
}
