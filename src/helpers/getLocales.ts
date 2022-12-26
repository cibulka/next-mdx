import i18nConfig from '../../i18n';

export function getLocaleDefault() {
  return i18nConfig.locales[0];
}

export default function getLocales() {
  return i18nConfig.locales;
}
