import { NextIntlConfig } from 'next-intl';

const locales = ['en', 'cs', 'ru'];

const i18nConfig: NextIntlConfig = {
  locales,
  defaultLocale: 'en',
  async getMessages(p) {
    const locale = p?.locale || locales[0];
    return (await import(`./messages/${locale}.json`)).default;
  },
};

export default i18nConfig;
