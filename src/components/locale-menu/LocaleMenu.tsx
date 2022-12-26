import React from 'react';
import i18nConfig from '../../../i18n';
import LocaleMenuView from './components/LocaleMenuView';

const localeLinks = i18nConfig.locales.map((locale) => {
  let label;
  switch (locale) {
    case 'cs':
      label = '🇨🇿 Česky';
      break;
    case 'en':
      label = '🇬🇧 English';
      break;
    case 'ru':
      label = '🇷🇺 Русский';
      break;
    default:
      throw new Error(`getLocaleLinks: Unknown locale ${locale}.`);
  }

  return {
    label,
    locale,
  };
});

const LocaleMenu = () => {
  return <LocaleMenuView links={localeLinks} />;
};

export default LocaleMenu;
