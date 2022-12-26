import path from 'path';
import { getLocaleDefault } from 'src/helpers/getLocales';

import { readMdxDir } from 'src/server/readMdx';
import { BundleItemProps } from 'src/types/mdx';

import { ArticlesData } from './Articles';

export default async function getArticlesData(
  props: BundleItemProps,
  locale: string,
): Promise<ArticlesData> {
  const count = typeof props.count === 'number' ? props.count : 3;
  const dirpath = path.join(process.cwd(), `db/${locale}/articles`);
  const dirpathDefault = path.join(process.cwd(), `db/${getLocaleDefault()}/articles`);
  const articles = await readMdxDir(dirpath, dirpathDefault, locale);
  const articlesMapped = articles.map((a) => ({ ...a, href: `/bird/${a.slug}` })).slice(0, count);
  return { articles: articlesMapped };
}
