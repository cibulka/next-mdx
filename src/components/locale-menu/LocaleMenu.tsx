'use client';
import React from 'react';

import LinkLocalizedClient from 'src/components/link-localized/LinkLocalizedClient';
import Menu from 'src/components/menu/Menu';

import getLocales from 'src/helpers/getLocales';
import useLocaleClient from 'src/hooks/useLocaleClient';
import usePathnameClient from 'src/hooks/usePathnameClient';

const localeLinks = getLocales().map((locale) => {
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

const LocaleMenu = (props: { className?: string; classNameMenu?: string; isBlack?: boolean }) => {
  const locale = useLocaleClient();
  const pathname = usePathnameClient(false);

  const currentLink = localeLinks.find((link) => link.locale === locale);

  return (
    <Menu
      className={props.className}
      classNameMenu={props.classNameMenu}
      isBlack={props.isBlack}
      items={localeLinks.map((link, i) => (
        <LinkLocalizedClient
          className="block p-2"
          href={pathname || '/'}
          key={i}
          locale={link.locale}
        >
          {link.label}
        </LinkLocalizedClient>
      ))}
    >
      {currentLink?.label || locale}
    </Menu>
  );
};

export default LocaleMenu;
