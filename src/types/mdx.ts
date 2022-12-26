export type SerializableLeaf = null | boolean | string | number | string[] | number[];

export type SerializableTree =
  | SerializableLeaf
  | { [key: string]: SerializableLeaf }
  | { [key: string]: SerializableTree };

export type MatterData = Record<string, SerializableLeaf>;

export type BundleItemProps = MatterData;

export type BundleItem = {
  type: string;
  props: BundleItemProps;
};

export type BundlePhoto = {
  src: string;
  w: number;
  h: number;
};

export interface BundleItemPromise extends BundleItem {
  data: Promise<SerializableTree>;
}

export interface BundleItemParsed extends BundleItem {
  data: Record<string, unknown>;
}

export interface Mdx {
  excerpt: string | null;
  href: string | null;
  photo: string | null;
  slug: string;
  title: string | null;
}

export interface MdxFull extends Mdx {
  content: string;
}

export interface MdxFullParsed extends MdxFull {
  bundle: BundleItem[];
}
