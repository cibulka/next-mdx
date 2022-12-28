import React, { forwardRef } from 'react';

import useLocaleClient from 'src/hooks/useLocaleClient';

import LinkLocalizedView from './components/LinkLocalizedView';
import { LinkProps } from './LinkLocalized.types';

function LinkLocalizedClient(props: LinkProps, ref: LinkProps['ref']) {
  const localeCurrent = useLocaleClient();
  return <LinkLocalizedView localeCurrent={localeCurrent} ref={ref} {...props} />;
}

export default forwardRef(LinkLocalizedClient);
