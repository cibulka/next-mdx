import appConfig from '../../app.config';

export function getLocaleDefault() {
  return appConfig.locales[0];
}

export default function getLocales() {
  return appConfig.locales;
}
