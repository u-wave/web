import i18next from 'i18next';

import * as en from '../locale/en.yaml';
import * as nl from '../locale/nl.yaml';

export default function createLocale(language) {
  i18next.init({
    lng: language,
    fallbackLng: 'en',
    defaultNS: 'uwave',
    resources: {
      en: { uwave: en },
      nl: { uwave: nl }
    },
    interpolation: {
      // Prevent double-escapes: React already escapes things for us
      escapeValue: false
    }
  });

  return i18next;
}
