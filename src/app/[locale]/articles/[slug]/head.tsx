import path from 'path';

import { getLocaleDefault } from 'src/helpers/getLocales';
import { getHeadTitleWithoutError } from 'src/helpers/getHeadTitleWithoutError';
import { readMdxFile } from 'src/server/readMdx';

const DIR = 'articles';

async function ArticleHead(props: { params: { slug: string; locale: string } }) {
  const { locale, slug } = props.params;

  const filepathMain = path.join(process.cwd(), `db/${locale}/${DIR}/${slug}.mdx`);
  const filepathDefault = path.join(process.cwd(), `db/${getLocaleDefault()}/${DIR}/${slug}.mdx`);
  const mdx = await readMdxFile(filepathMain, filepathDefault, locale);

  return (
    <>
      <title>{getHeadTitleWithoutError(locale, mdx)}</title>
    </>
  );
}

export default ArticleHead;
