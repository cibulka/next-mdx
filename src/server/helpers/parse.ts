import { MatterData, Mdx, MdxFull, MdxFullParsed, MdxParsed } from 'src/types/mdx';

import readPhoto from '../readPhoto';

import getMdxBundle from './bundle';

async function parsePhotoMdx(matter: MatterData) {
  return typeof matter.photo === 'string' ? await readPhoto(matter.photo) : null;
}

export async function parseMdx(mdx: Mdx): Promise<MdxParsed> {
  const result = {
    ...mdx,
    photoMdx: await parsePhotoMdx(mdx.matter),
  };
  return result;
}

export async function parseMdxFull(mdx: MdxFull, locale: string): Promise<MdxFullParsed> {
  const [bundle, photoMdx] = await Promise.all([
    getMdxBundle(mdx.content, locale),
    parsePhotoMdx(mdx.matter),
  ]);

  const result = {
    ...mdx,
    bundle,
    photoMdx,
  };
  return result;
}
