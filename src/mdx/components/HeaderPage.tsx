import React from 'react';
import MaxWidthEscape from 'src/components/max-width-escape/MaxWidthEscape';
import { MdxFull } from 'src/types/mdx';

const HeaderPage = (props: { mdx: MdxFull }) => {
  return (
    <div className="mt-4 pb-8 mb-4 border-b">
      <MaxWidthEscape as="header">
        <div className="ml-auto mr-auto" style={{ width: '60em', maxWidth: 'calc(100vw - 2em)' }}>
          <h1 className="text-5xl text-primary font-bold mb-4">
            {props.mdx.title || props.mdx.slug}
          </h1>
          <p className="text-3xl leading-relaxed">{props.mdx.excerpt}</p>
        </div>
      </MaxWidthEscape>
    </div>
  );
};

export default HeaderPage;
