import React, { forwardRef } from 'react';
import { useLocale } from 'next-intl';

import LinkLocalizedView from './components/LinkLocalizedView';
import { LinkProps } from './LinkLocalized.types';

function LinkLocalizedServer(props: LinkProps, ref: LinkProps['ref']) {
  const localeCurrent = useLocale();
  return <LinkLocalizedView localeCurrent={localeCurrent} ref={ref} {...props} />;
}

export default forwardRef(LinkLocalizedServer);
