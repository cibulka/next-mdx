import { ImageMdx, MatterData } from './data';
import { ElementParsedWithData } from './elements';

export * from './data';
export * from './elements';
export * from './filedata';

export interface Mdx {
  excerpt: string | null;
  matter: MatterData;
  photo: string | null;
  slug: string;
  title: string | null;
}

export interface MdxParsed extends Mdx {
  photoMdx: ImageMdx | null;
}

export interface MdxFull extends Mdx {
  content: string;
}

export interface MdxFullParsed extends MdxParsed, MdxFull {
  bundle: ElementParsedWithData[];
}

/* Articles */

export interface MdxArticleParsed extends MdxParsed {
  category: string | null;
  href: string;
}
