import readPhoto from 'src/server/readPhoto';
import { ElementParsedProps } from 'src/types/mdx';

import { ImageData } from './Image';

export default async function getImageData(props: ElementParsedProps): Promise<ImageData> {
  let src = props.src;
  if (typeof src !== 'string') throw new Error('getImageData: SRC must be string');
  return await readPhoto(src);
}
