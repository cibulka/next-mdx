import markdownToHtml from '@wcj/markdown-to-html';
import { Interweave } from 'interweave';
import { polyfill } from 'interweave-ssr';

import { MdxFullParsed } from 'src/types/mdx';

import transform from '../helpers/transform';

polyfill();

async function MdxReader(props: {
  className?: string;
  mdx: MdxFullParsed;
  isNotFormatted?: boolean;
}) {
  const html = markdownToHtml(props.mdx.content, {});

  return (
    <Interweave
      transform={(node, children) => transform(node, children, props.mdx.bundle)}
      content={html as string}
      tag="div"
      className={[props.className, !props.isNotFormatted && 'prose'].filter(Boolean).join(' ')}
    />
  );
}

export default MdxReader;
