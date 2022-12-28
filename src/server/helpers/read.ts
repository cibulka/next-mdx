import fs, { promises as fsAsync } from 'fs';

import { FileDataMdx, MdxParsed } from 'src/types/mdx';

import { filedataToMdx } from './filedata';
import { parseMdx } from './parse';

export async function readFilepath(filepath: string): Promise<FileDataMdx> {
  const filedata = await fsAsync.readFile(filepath, 'utf-8');
  return { data: filedata, path: filepath };
}

export async function readFilepaths(
  filepathMain: string,
  filepathDefault: string,
): Promise<[FileDataMdx, FileDataMdx]> {
  let filepathMainUsed = filepathMain;
  if (!fs.existsSync(filepathMain)) filepathMainUsed = filepathDefault;

  let promises: Promise<FileDataMdx>[] = [readFilepath(filepathMainUsed)];
  if (filepathMain !== filepathDefault) promises = [...promises, readFilepath(filepathDefault)];

  const filedata = await Promise.all(promises);
  return [filedata[0], filedata[1] || filedata[0]];
}

export async function readMdx(filepathMain: string, filepathDefault: string): Promise<MdxParsed> {
  const [filedataMain, filedataDefault] = await readFilepaths(filepathMain, filepathDefault);
  const mdx = filedataToMdx(filedataMain, filedataDefault);
  const mdxParsed = parseMdx(mdx);
  return mdxParsed;
}
