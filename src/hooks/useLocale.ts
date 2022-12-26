'use client';
import { usePathname } from 'next/navigation';

function useLocale() {
  const pathname = usePathname();
  if (!pathname) {
    throw new Error(
      [
        'useLocale: Pathname is empty.',
        'Maybe this hook is called on server (which it should not)?',
      ].join(' '),
    );
  }

  const locale = pathname.split('/').filter(Boolean)[0];
  return locale;
}

export default useLocale;
