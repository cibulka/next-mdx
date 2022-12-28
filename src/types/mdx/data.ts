export type SerializableLeaf = null | boolean | string | number | string[] | number[];

export type SerializableTree =
  | SerializableLeaf
  | { [key: string]: SerializableLeaf }
  | { [key: string]: SerializableTree };

export type MatterData = Record<string, SerializableLeaf>;

export type ImageMdx = {
  src: string;
  width: number;
  height: number;
};
