import { Node } from 'interweave';

import Articles, { ArticlesData } from 'src/blocks/articles/Articles';
import Image, { ImageData } from 'src/blocks/image/Image';

import LinkLocalizedServer from 'src/components/link-localized/LinkLocalizedServer';
import { parseElementsFromHtml } from 'src/server/helpers/attrs';
import { ElementParsedWithData } from 'src/types/mdx';

function getDataFromBundle(type: string, attrs: NamedNodeMap, bundle: ElementParsedWithData[]) {
  const datasOfType = bundle.filter((bundleItem) => bundleItem.type.toLowerCase() === type);
  if (datasOfType.length === 1) return datasOfType[0];

  const attrsParsed = parseElementsFromHtml(attrs);
  const attrsParsedStr = JSON.stringify(attrsParsed);

  const dataOfSameAttr = datasOfType.find(
    (bundleItem) => attrsParsedStr === JSON.stringify(bundleItem.props),
  );
  if (dataOfSameAttr) return dataOfSameAttr;

  throw new Error(
    [
      'getDataFromBundle:',
      `${type} with attrs ${JSON.stringify(attrs)} was not found in bundle.`,
    ].join(' '),
  );
}

function transform(node: HTMLElement, children: Node[], bundle: ElementParsedWithData[]) {
  if (node.tagName === 'a') {
    return (
      <LinkLocalizedServer
        className="text-primary underline"
        href={node.getAttribute('href') || '/'}
      >
        {children}
      </LinkLocalizedServer>
    );
  }

  if (node.tagName === 'p') {
    const isTextContent = node.childNodes[0].nodeName === '#text';
    return isTextContent ? <p>{children}</p> : <>{children}</>;
  }

  if (node.tagName === 'articles') {
    const data = getDataFromBundle('articles', node.attributes, bundle).data as ArticlesData;
    const attrCount = node.getAttribute('count');
    return (
      <>
        <Articles count={attrCount ? parseInt(attrCount) : 3} articles={data.articles} />
        {children}
      </>
    );
  }

  if (node.tagName === 'img') {
    const data = getDataFromBundle('image', node.attributes, bundle).data as ImageData;
    const align =
      node.getAttribute('align') === 'left'
        ? 'left'
        : node.getAttribute('align') === 'right'
        ? 'right'
        : 'center';
    const attrAlt = node.getAttribute('alt');
    const attrTitle = node.getAttribute('title');
    const attrSrc = node.getAttribute('src') || '';
    return (
      <Image
        align={align}
        alt={attrAlt || ''}
        src={attrSrc}
        title={attrTitle || null}
        width={data.width}
        height={data.height}
      />
    );
  }
}

export default transform;
