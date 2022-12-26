import React from 'react';
import LocaleMenu from 'src/components/locale-menu/LocaleMenu';

import Icon from 'public/logo/bird.svg';

const Nav = (props: { title: string }) => (
  <nav className="flex items-center justify-between p-4">
    <div className="flex items-center">
      <span className="flex w-8 h-8 mr-2">
        <Icon />
      </span>
      <h1 className="text-xl font-bold">{props.title}</h1>
    </div>
    <LocaleMenu />
  </nav>
);

export default Nav;
