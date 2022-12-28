import React from 'react';
import { useLocale } from 'next-intl';

import { MdxFull } from 'src/types/mdx';

import MdxReader from './components/MdxReader';

const MdxPage = (props: { mdx: MdxFull }) => {
  const locale = useLocale();

  return (
    <div className="app-max-w-content">
      {/* @ts-expect-error Server Component */}
      <MdxReader mdx={props.mdx} locale={locale} />
    </div>
  );
};

export default MdxPage;
