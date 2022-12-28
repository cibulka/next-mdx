import getArticlesData from 'src/blocks/articles/Articles.data';
import getImageData from 'src/blocks/image/Image.data';

import { ElementParsed, ElementParsedWithData } from 'src/types/mdx';

import { parseElementsFromJsxParser } from './attrs';
import JSXParser from './elements';

// const JSXParserAcorn = acorn.Parser.extend(acornJsx());

export default async function getMdxBundle(
  content: string,
  locale: string,
): Promise<ElementParsedWithData[]> {
  // @ts-expect-error
  const elementsRaw = [...content.matchAll(/<[A-Z]/g)].map((match) =>
    JSXParser(content.slice(match.index)),
  );
  const elements: ElementParsed[] = elementsRaw.map((element) => ({
    type: element.type as string,
    props: parseElementsFromJsxParser(element.props),
  }));

  let promises: Promise<Record<string, any>>[] = elements.map((element) => {
    switch (element.type) {
      case 'Articles':
        return getArticlesData(element.props, locale);
      case 'Image':
        return getImageData(element.props);
      default:
        return new Promise(() => true);
    }
  });

  const data = await Promise.all(promises);

  let result: ElementParsedWithData[] = [];
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    result = [
      ...result,
      {
        ...element,
        data: data[i],
      },
    ];
  }

  return result;
}
