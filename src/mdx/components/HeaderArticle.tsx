import React from 'react';

import Image from 'src/blocks/image/Image';
import { MdxFullParsed } from 'src/types/mdx';

const HeaderArticle = (props: { mdx: MdxFullParsed }) => {
  return (
    <header className="grid grid-cols-2 gap-x-8 mb-8">
      <div className="flex items-center border-t-2 border-b-2">
        <h1 className={['text-5xl leading-tight', 'font-bold text-primary'].join(' ')}>
          {props.mdx.title || props.mdx.slug}
        </h1>
        {!props.mdx.isTranslated && <div>NOT TRANSLATED</div>}
      </div>
      <div>
        <Image
          src={props.mdx.photoMdx?.src || null}
          alt="Photo"
          height={props.mdx.photoMdx?.height || null}
          width={props.mdx.photoMdx?.width || null}
        />
      </div>
    </header>
  );
};

export default HeaderArticle;
