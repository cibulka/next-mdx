import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { IconContext } from 'react-icons';
import { NextIntlServerProvider } from 'next-intl/server';

import appConfig from '../../../app.config';
import AppLayout from 'src/components/app-layout/AppLayout';

export function generateStaticParams() {
  return appConfig.locales.map((locale) => ({ locale }));
}

export default async function Layout(props: { children: ReactNode; params: { locale: string } }) {
  const { locale } = props.params;

  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

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
        <NextIntlServerProvider locale={locale} messages={messages}>
          <AppLayout>{props.children}</AppLayout>
        </NextIntlServerProvider>
      </body>
    </html>
  );
}
