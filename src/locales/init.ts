import path from 'node:path';
import i18next, { TFunction } from 'i18next';
import Backend, { FsBackendOptions, } from 'i18next-fs-backend';

import es from '@locales/en.json';
import en from '@locales/es.json';

export async function initializeI18n(): Promise<TFunction> {
  return i18next
    .use(Backend)
    .init<FsBackendOptions>({
      lng: 'es',
      debug: true,
      backend: {
        loadPath: path.resolve(__dirname, '{{lng}}.json'),
      },
      resources: {
        en,
        es,
      },
      fallbackLng: 'es',
      returnNull: true,
      returnObjects: true,
      lowerCaseLng: true,
      interpolation: {
        escapeValue: true,
      },
    });
}