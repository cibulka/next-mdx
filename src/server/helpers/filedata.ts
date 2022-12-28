import path from 'path';

import matter from './matter';
import { mergeData } from './mergeData';
import removeExcerptFromContent from './removeExcerptFromContent';

import { FileDataMdx, Mdx, MdxFull } from 'src/types/mdx';

export function filedataToMdx(filedataMain: FileDataMdx, filedataDefault: FileDataMdx) {
  const { data: dataMain, excerpt } = matter(filedataMain.data);
  const { data: dataDefault } = matter(filedataDefault.data);

  const data = mergeData(dataMain, dataDefault);

  const result: Mdx = {
    excerpt: excerpt || null,
    matter: data,
    photo: typeof data.photo === 'string' ? data.photo : null,
    slug: path.basename(filedataMain.path, '.mdx'),
    title: typeof data.title === 'string' ? data.title : null,
  };

  return result;
}

export function filedataToMdxFull(filedataMain: FileDataMdx, filedataDefault: FileDataMdx) {
  const { content, excerpt } = matter(filedataMain.data);
  const mdx = filedataToMdx(filedataMain, filedataDefault);
  const result: MdxFull = {
    ...mdx,
    content: removeExcerptFromContent(content, excerpt || null),
  };
  return result;
}
