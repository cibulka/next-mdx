import { MatterData, SerializableLeaf } from './data';

/* JSXParser */

export type ElementFromJsxParserProps = Record<
  string,
  | string
  | {
      type: '#jsx';
      nodeValue: string | number;
    }
>;

export type ElementFromJsxParser = {
  type: string;
  props: ElementFromJsxParserProps;
};

/* HTML */

export type ElementFromHtml = {
  name: string;
  value: string;
};

/* Parsed */

export type ElementParsedProps = Record<string, SerializableLeaf>;

export type ElementParsed = {
  type: string;
  props: ElementParsedProps;
};

export type ElementParsedWithData = ElementParsed & {
  data: Record<string, unknown>;
};
