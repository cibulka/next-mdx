import fs from 'fs';
import path from 'path';
import probe from 'probe-image-size';

export default async function readPhoto(src: string) {
  let filepath = src;
  if (!filepath.startsWith('/')) filepath = `/${filepath}`;
  if (!filepath.startsWith('/public')) filepath = `/public${filepath}`;
  filepath = path.join(process.cwd(), filepath);

  const result = await probe(fs.createReadStream(filepath));
  if (!result.width || !result.height) {
    throw new Error('getImageData: Weird result.');
  }

  let srcUsed = src;
  if (!srcUsed.startsWith('/')) srcUsed = `/${srcUsed}`;
  if (srcUsed.startsWith('public')) srcUsed = srcUsed.replace(/^public/, '');

  return { width: result.width, height: result.height, src: srcUsed };
}
