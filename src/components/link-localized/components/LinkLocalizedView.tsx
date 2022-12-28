import React, { forwardRef } from 'react';
import Link from 'next/link';

import { LinkProps } from '../LinkLocalized.types';

function LinkLocalizedView(props: LinkProps & { localeCurrent: string }, ref: LinkProps['ref']) {
  const { href, locale, localeCurrent, ...rest } = props;
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

export default forwardRef(LinkLocalizedView);
