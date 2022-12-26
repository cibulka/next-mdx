import { BundleItem, BundleItemParsed } from 'src/types/mdx';

import getArticlesData from 'src/blocks/articles/Articles.data';
import getImageData from 'src/blocks/image/Image.data';

import JSXParser from './getBundleItems';

export default async function getMdxBundle(
  content: string,
  locale: string,
): Promise<BundleItemParsed[]> {
  const bundleItems = [...content.matchAll(/<[A-Z]/g)].map((match) =>
    JSXParser(content.slice(match.index)),
  );

  let promises: Promise<Record<string, any>>[] = bundleItems.map((bundleItem) => {
    switch (bundleItem.type) {
      case 'Articles':
        return getArticlesData(bundleItem.props, locale);
      case 'Image':
        return getImageData(bundleItem.props);
      default:
        return new Promise(() => true);
    }
  });

  const data = await Promise.all(promises);

  let result: BundleItemParsed[] = [];
  for (let i = 0; i < bundleItems.length; i += 1) {
    const bundleItem = bundleItems[i];
    result = [
      ...result,
      {
        ...bundleItem,
        data: data[i],
      },
    ];
  }

  return result;
}
