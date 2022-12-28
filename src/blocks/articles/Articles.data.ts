import path from 'path';
import { getLocaleDefault } from 'src/helpers/getLocales';

import { readMdxDir } from 'src/server/readMdx';
import { ElementParsedProps } from 'src/types/mdx';

import { ArticlesData } from './Articles';

export default async function getArticlesData(
  props: ElementParsedProps,
  locale: string,
): Promise<ArticlesData> {
  const category = typeof props.category === 'string' ? props.category : null;
  const count = typeof props.count === 'number' ? props.count : 3;

  const dirpath = path.join(process.cwd(), `db/${locale}/articles`);
  const dirpathDefault = path.join(process.cwd(), `db/${getLocaleDefault()}/articles`);
  const articles = await readMdxDir(dirpath, dirpathDefault);
  const articlesMapped = articles
    .map((a) => ({
      ...a,
      category: typeof a.matter.category === 'string' ? a.matter.category : null,
      href: `/articles/${a.slug}`,
    }))
    .filter((a) => {
      if (!category) return true;
      return a.category === category;
    })
    .slice(0, count);

  return { articles: articlesMapped };
}
