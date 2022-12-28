'use client';
import React from 'react';
import LocaleMenu from 'src/components/locale-menu/LocaleMenu';

import Icon from 'public/logo/bird.svg';
import LinkLocalizedServer from 'src/components/link-localized/LinkLocalizedServer';
import LinkLocalizedClient from 'src/components/link-localized/LinkLocalizedClient';

const Nav = (props: { title: string }) => (
  <nav className="coat-menu">
    <div className={['app-max-w-content', 'flex items-center justify-between', 'py-4'].join(' ')}>
      <LinkLocalizedClient href="/" className="flex items-center">
        <span className="flex w-8 h-8 mr-2 -ml-4">
          <Icon />
        </span>
        <h1 className="text-xl font-bold">{props.title}</h1>
      </LinkLocalizedClient>
      <LocaleMenu isBlack />
    </div>
  </nav>
);

export default Nav;
