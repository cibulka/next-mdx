import fs from 'fs';
import path from 'path';
import probe from 'probe-image-size';
import { BundleItemProps } from 'src/types/mdx';

import { ImageData } from './Image';

export default async function getImageData(props: BundleItemProps): Promise<ImageData> {
  const src = props.src;
  if (typeof src !== 'string') throw new Error('getImageData: SRC must be string');

  let srcUsed = src;
  if (!srcUsed.startsWith('/')) srcUsed = `/${srcUsed}`;
  if (!srcUsed.startsWith('/public')) srcUsed = `/public${srcUsed}`;

  const filepath = path.join(process.cwd(), srcUsed);
  const result = await probe(fs.createReadStream(filepath));
  if (!result.width || !result.height) {
    throw new Error('getImageData: Weird result.');
  }

  return { width: result.width, height: result.height };
}
