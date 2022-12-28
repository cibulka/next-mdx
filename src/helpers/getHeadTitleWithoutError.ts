import { Mdx } from 'src/types/mdx';

import cs from '../../messages/cs.json';
import en from '../../messages/en.json';
import ru from '../../messages/ru.json';

/**
 * `useTranslations` in `Head.ts` produces "Expected a suspended thenable. This is a bug in React. Please file an issue." Because of that we pull the app title here manually.
 */
export function getHeadTitleWithoutError(locale: string, mdx: Mdx | null) {
  let appTitle;
  switch (locale) {
    case 'cs':
      appTitle = cs.app.title;
      break;
    case 'en':
      appTitle = en.app.title;
      break;
    case 'ru':
      appTitle = ru.app.title;
      break;
    default:
      throw new Error(`getHeadTitleWithoutError: Unknown locale ${locale}.`);
  }

  let titleParts: string[] = [];
  if (mdx) titleParts = [...titleParts, mdx.title || mdx.slug];
  titleParts = [...titleParts, appTitle];

  return titleParts.join(' | ');
}
