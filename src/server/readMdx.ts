import path from 'path';
import fs, { promises as fsAsync } from 'fs';
import matter from 'gray-matter';

import { MatterData, Mdx, MdxFull } from 'src/types/mdx';

function mergeData(dataMain: MatterData, dataDefault: MatterData) {
  const dataMerged = dataMain;
  Object.keys(dataDefault).forEach((key) => {
    if (!dataMerged[key]) dataMerged[key] = dataDefault[key];
  });
  return dataMerged;
}

function filedataToMdxFull(filedataMain: string, filedataDefault: string, slug: string) {
  const { content } = matter(filedataMain, { excerpt: true });
  const mdx = filedataToMdx(filedataMain, filedataDefault, slug);
  const result: Omit<MdxFull, 'href'> = {
    ...mdx,
    content,
  };
  return result;
}

function filedataToMdx(filedataMain: string, filedataDefault: string, slug: string) {
  const { data: dataMain, excerpt } = matter(filedataMain, { excerpt: true });
  const { data: dataDefault } = matter(filedataDefault);

  const data = mergeData(dataMain, dataDefault);

  const result: Omit<Mdx, 'href'> = {
    excerpt: excerpt || null,
    photo: typeof data.photo === 'string' ? data.photo : null,
    slug,
    title: typeof data.title === 'string' ? data.title : null,
  };

  return result;
}

export async function readMdx(filepathMain: string, filepathDefault: string, locale: string) {
  let filedataPromised: Promise<string>[] = [fsAsync.readFile(filepathMain, 'utf-8')];
  if (filepathMain !== filepathDefault) {
    filedataPromised = [...filedataPromised, fsAsync.readFile(filepathDefault, 'utf-8')];
  }

  const filedata = await Promise.all(filedataPromised);
  const filedataMain = filedata[0];
  const filedataDefault = filedata[1] || filedataMain;

  const slug = path.basename(filepathMain);
  const result = filedataToMdxFull(filedataMain, filedataDefault, slug);

  return result;
}

export async function readMdxDir(dirpathMain: string, dirpathDefault: string, locale: string) {
  const filesMain = fs.readdirSync(dirpathMain);

  let result: Omit<Mdx, 'href'>[] = [];

  for (let i = 0; i < filesMain.length; i += 1) {
    const filepathMain = path.join(dirpathMain, filesMain[i]);
    if (path.extname(filepathMain) !== '.mdx') continue;
    const filepathDefault = path.join(dirpathDefault, filesMain[i]);
    result = [...result, await readMdx(filepathMain, filepathDefault, locale)];
  }

  return result;
}
