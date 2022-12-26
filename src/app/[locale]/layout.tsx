import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { NextIntlServerProvider } from 'next-intl/server';

import Footer from 'src/components/layout/footer/Footer';
import Nav from 'src/components/layout/nav/Nav';

import i18n from '../../../i18n';

import 'src/styles/globals.css';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default function Layout(props: { children: ReactNode; params: { locale: string } }) {
  const translate = useTranslations('app');
  return (
    <html lang={props.params.locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <NextIntlServerProvider locale={props.params.locale}>
          <div id="app" className="flex flex-col">
            <Nav title={translate('title')} />
            <div className="flex-1 p-4">{props.children}</div>
            <Footer />
          </div>
        </NextIntlServerProvider>
      </body>
    </html>
  );
}
