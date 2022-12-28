import React, { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import Footer from './footer/Footer';
import Nav from './nav/Nav';

const AppLayout = (props: { children: ReactNode }) => {
  const translate = useTranslations();
  return (
    <div id="app" className="flex flex-col coat-page">
      <Nav title={translate('app.title')} />
      <div className="flex-1 p-4">{props.children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
