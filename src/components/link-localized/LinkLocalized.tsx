import { ComponentProps, forwardRef } from 'react';
import Link from 'next/link';

import useLocale from 'src/hooks/useLocale';

type Props = ComponentProps<typeof Link>;

function LinkLocalized({ href, locale, ...rest }: Props, ref: Props['ref']) {
  const localeCurrent = useLocale();
  const localeUsed = locale || localeCurrent;

  function getLocalizedHref(originalHref: string) {
    return originalHref.replace(/^\//, '/' + localeUsed + '/');
  }

  const localizedHref =
    typeof href === 'string'
      ? getLocalizedHref(href)
      : href.pathname != null
      ? { ...href, pathname: getLocalizedHref(href.pathname) }
      : href;

  return <Link ref={ref} href={localizedHref} {...rest} />;
}

export default forwardRef(LinkLocalized);
