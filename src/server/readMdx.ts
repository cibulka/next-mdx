import path from 'path';
import fs from 'fs';

import { Mdx, MdxParsed } from 'src/types/mdx';
import { filedataToMdxFull } from './helpers/filedata';
import { parseMdx, parseMdxFull } from './helpers/parse';
import { readFilepaths, readMdx } from './helpers/read';

export async function readMdxFile(filepathMain: string, filepathDefault: string, locale: string) {
  const { filedata, isTranslated } = await readFilepaths(filepathMain, filepathDefault);
  const [filedataMain, filedataDefault] = filedata;
  const mdxFull = filedataToMdxFull(filedataMain, filedataDefault, isTranslated);
  const mdxFullParsed = await parseMdxFull(mdxFull, locale);

  return mdxFullParsed;
}

export async function readMdxDir(dirpathMain: string, dirpathDefault: string) {
  const filesMain = fs.readdirSync(dirpathMain);

  let promisesForReading: Promise<Mdx>[] = [];
  for (let i = 0; i < filesMain.length; i += 1) {
    const filepathMain = path.join(dirpathMain, filesMain[i]);
    if (path.extname(filepathMain) !== '.mdx') continue;
    const filepathDefault = path.join(dirpathDefault, filesMain[i]);
    promisesForReading = [...promisesForReading, readMdx(filepathMain, filepathDefault)];
  }
  const mdx: Mdx[] = await Promise.all(promisesForReading);

  const promisesForParsing = mdx.map(parseMdx);
  const mdxParsed: MdxParsed[] = await Promise.all(promisesForParsing);
  return mdxParsed;
}
