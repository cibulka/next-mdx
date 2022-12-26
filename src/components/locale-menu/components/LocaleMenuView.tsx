'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Menu from 'src/components/menu/Menu';
import useLocale from 'src/hooks/useLocale';

const LocaleMenuView = (props: { links: { locale: string; label: string }[] }) => {
  const pathname = usePathname();
  const localeCurrent = useLocale();
  if (!pathname) throw new Error('LocaleMenuView: No pathname provided.');

  return (
    <Menu
      items={props.links.map((link, i) => (
        <Link href="/" key={i}>
          {link.label}
        </Link>
      ))}
    >
      Select language
    </Menu>
  );
};

export default LocaleMenuView;
