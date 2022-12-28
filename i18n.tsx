import { NextIntlConfig } from 'next-intl';

const locales = ['en', 'cs', 'ru'];

const i18nConfig: NextIntlConfig = {
  locales,
  defaultLocale: locales[0],
  async getMessages(p) {
    // if (!p) throw new Error('No params provided!');
    return (await import(`./messages/${p?.locale || locales[0]}.json`)).default;
  },
};

export default i18nConfig;
