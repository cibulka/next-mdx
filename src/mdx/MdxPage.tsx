import React, { FC } from 'react';
import { useLocale } from 'next-intl';

import { MdxFull, MdxFullParsed } from 'src/types/mdx';

import HeaderArticle from './components/HeaderArticle';
import HeaderPage from './components/HeaderPage';
import MdxReader from './components/MdxReader';

const MdxPage = (props: { mdx: MdxFullParsed; type: string }) => {
  const locale = useLocale();

  let Header: FC<{ mdx: MdxFullParsed }> | null;
  switch (props.type) {
    case 'page':
      Header = HeaderPage;
      break;
    case 'article':
      Header = HeaderArticle;
      break;
    default:
      Header = null;
      break;
  }

  return (
    <div className="app-max-w-content">
      {Header && <Header mdx={props.mdx} />}
      {/* @ts-expect-error Server Component */}
      <MdxReader mdx={props.mdx} locale={locale} />
    </div>
  );
};

export default MdxPage;
