import path from 'path';

import { getLocaleDefault } from 'src/helpers/getLocales';
import MdxPage from 'src/mdx/MdxPage';
import { readMdxFile } from 'src/server/readMdx';

async function PageIndex(props: { params: { locale: string } }) {
  const { locale } = props.params;

  const filepathMain = path.join(process.cwd(), `db/${locale}/pages/home.mdx`);
  const filepathDefault = path.join(process.cwd(), `db/${getLocaleDefault()}/pages/home.mdx`);
  const mdx = await readMdxFile(filepathMain, filepathDefault, locale);

  return <MdxPage mdx={mdx} />;
}

export default PageIndex;
