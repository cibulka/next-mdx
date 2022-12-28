import { ElementFromJsxParserProps, ElementParsedProps, SerializableLeaf } from 'src/types/mdx';

const TEXT_PROP_NAMES = ['text', 'caption', 'title', 'alt'];

function isPropValueArray(prop: { name: string; value: string }) {
  return !TEXT_PROP_NAMES.includes(prop.name) && prop.value.split(',').length > 1;
}

function parseArray(value: string): string[] | number[] {
  const arr = value.split(',');
  const isAllNumeric = arr.filter((v) => isNaN(Number(v))).length === 0;
  return isAllNumeric ? arr.map((v) => Number(v)) : arr;
}

export function parseElementsFromJsxParser(props: ElementFromJsxParserProps): ElementParsedProps {
  const result: ElementParsedProps = {};

  const propsNames = Object.keys(props);
  for (let i = 0; i < propsNames.length; i += 1) {
    const propName = propsNames[i];
    const propValue = props[propName];

    let parsedValue: SerializableLeaf;

    if (typeof propValue === 'string') {
      if (isPropValueArray({ name: propName, value: propValue })) {
        parsedValue = parseArray(propValue);
      } else {
        parsedValue = propValue;
      }
      result[propName] = parsedValue;
      continue;
    }

    const valueNonString = propValue.nodeValue;
    if (valueNonString === 'true') {
      parsedValue = true;
    } else if (valueNonString === 'false') {
      parsedValue = false;
    } else if (valueNonString === 'null') {
      parsedValue = null;
    } else if (typeof valueNonString === 'number' || !isNaN(Number(valueNonString))) {
      parsedValue = Number(valueNonString);
    } else {
      throw new Error(`parseElements: Weird prop value ${valueNonString}.`);
    }
    result[propName] = parsedValue;
  }

  return result;
}

export function parseElementsFromHtml(nodeAttrs: NamedNodeMap): ElementParsedProps {
  const result: ElementParsedProps = {};

  for (let i = 0; i < nodeAttrs.length; i += 1) {
    const { name, value } = nodeAttrs[i];
    const matches = value.match(/\{(.*)\}/);
    const valueNonString = matches ? matches[1] : null;

    let parsedValue: SerializableLeaf = null;
    if (valueNonString && valueNonString === 'true') {
      parsedValue = true;
    } else if (valueNonString && valueNonString === 'false') {
      parsedValue = false;
    } else if (valueNonString && valueNonString === 'null') {
      parsedValue = null;
    } else if (valueNonString && !isNaN(Number(valueNonString))) {
      parsedValue = Number(valueNonString);
    } else if (isPropValueArray({ name, value })) {
      parsedValue = parseArray(value);
    } else {
      parsedValue = value;
    }

    result[name] = parsedValue;
  }

  return result;
}
