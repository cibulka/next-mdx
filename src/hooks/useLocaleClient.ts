'use client';
import { usePathname } from 'next/navigation';
import getLocales from 'src/helpers/getLocales';

export default function useLocaleClient() {
  const locales = getLocales();
  const pathname = usePathname();

  if (!pathname) throw new Error('useLocaleClient: Missing pathname');
  const locale = pathname.split('/').filter(Boolean)[0];
  if (!locales.includes(locale)) throw new Error(`useLocaleClient: Weird locale ${locale}.`);

  return locale;
}
