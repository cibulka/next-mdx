import path from 'path';
import React from 'react';

import { getLocaleDefault } from 'src/helpers/getLocales';
import MdxPage from 'src/mdx/MdxPage';
import generateStaticPathsForDirectory from 'src/server/generateStaticPathsForDirectory';
import { readMdxFile } from 'src/server/readMdx';

const DIR = 'articles';

export function generateStaticParams() {
  const dir = path.join(process.cwd(), `db/${getLocaleDefault()}/${DIR}`);
  return generateStaticPathsForDirectory(dir);
}

async function BirdPage(props: { params: { locale: string; slug: string } }) {
  const { locale, slug } = props.params;

  const filepathMain = path.join(process.cwd(), `db/${locale}/${DIR}/${slug}.mdx`);
  const filepathDefault = path.join(process.cwd(), `db/${getLocaleDefault()}/${DIR}/${slug}.mdx`);
  const mdx = await readMdxFile(filepathMain, filepathDefault, locale);

  return <MdxPage mdx={mdx} />;
}

export default BirdPage;
