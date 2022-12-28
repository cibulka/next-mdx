import { usePathname } from 'next/navigation';

import useLocaleClient from './useLocaleClient';

export default function usePathnameClient(keepLocale = false): string {
  let pathname = usePathname();
  const locale = useLocaleClient();
  if (!pathname) throw new Error(`usePathname: Empty. Maybe called on server?`);
  if (!keepLocale) {
    const pathnameArr = pathname.split('/').filter(Boolean);
    if (pathnameArr[0] !== locale) return pathname;
    return pathnameArr.slice(1).join('/');
  }
  return pathname;
}
