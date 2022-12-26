import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import markdownToHtml from '@wcj/markdown-to-html';
import { Interweave, Node } from 'interweave';
import { polyfill } from 'interweave-ssr';

import Articles, { ArticlesData } from 'src/blocks/articles/Articles';
import Image, { ImageData } from 'src/blocks/image/Image';
import getMdxBundle from './helpers/getMdxBundle';
import { BundleItemParsed } from 'src/types/mdx';

polyfill();

const TYPE_INDEX: Record<string, number> = {};

function getDataFromBundle(type: string, bundle: BundleItemParsed[]) {
  if (!TYPE_INDEX[type]) {
    TYPE_INDEX[type] = -1;
  }

  TYPE_INDEX[type] += 1;

  const datasOfType = bundle.filter((item) => item.type.toLowerCase() === type);
  if (!datasOfType[TYPE_INDEX[type]]) {
    throw new Error(`${type}/${TYPE_INDEX[type]}: Data was not found.`);
  }
  return datasOfType[TYPE_INDEX[type]];
}

function transform(node: HTMLElement, children: Node[], bundle: BundleItemParsed[]) {
  if (node.tagName === 'a') {
    return (
      <Link className="blue" href={node.getAttribute('href') || '/'}>
        {children}
      </Link>
    );
  }

  if (node.tagName === 'articles') {
    const data = getDataFromBundle('articles', bundle).data as ArticlesData;
    const attrCount = node.getAttribute('count');
    return (
      <>
        <Articles count={attrCount ? parseInt(attrCount) : 3} articles={data.articles} />
        {children}
      </>
    );
  }

  if (node.tagName === 'img') {
    const data = getDataFromBundle('image', bundle).data as ImageData;
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

async function MdxReader(props: { className?: string; content: string; locale: string }) {
  const html = markdownToHtml(props.content);

  const bundle = await getMdxBundle(props.content, props.locale);

  return (
    <Interweave
      transform={(node, children) => transform(node, children, bundle)}
      content={html as string}
      tag="div"
      className={props.className}
    />
  );
}

export default MdxReader;
