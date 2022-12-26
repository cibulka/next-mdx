import React from 'react';
import { useLocale } from 'next-intl';
import { polyfill } from 'interweave-ssr';

import { MdxFull } from 'src/types/mdx';
import MdxReader from 'src/components/mdx-reader/MdxReader';

polyfill();

const PageContainer = (props: { mdx: MdxFull }) => {
  const locale = useLocale();
  // @ts-expect-error Server Component
  return <MdxReader content={props.mdx.content} locale={locale} />;
};

export default PageContainer;
