import path from 'path';

import PageContainer from 'src/containers/page/Page';
import { readMdx } from 'src/server/readMdx';

async function PageIndex(props: { params: { locale: string } }) {
  const { locale } = props.params;

  const filepathMain = path.join(process.cwd(), `db/${locale}/pages/home.mdx`);
  const filepathDefault = path.join(process.cwd(), `db/cs/pages/home.mdx`);
  const mdx = await readMdx(filepathMain, filepathDefault, locale);

  return <PageContainer mdx={{ ...mdx, href: '/' }} locale={locale} />;
}

export default PageIndex;
