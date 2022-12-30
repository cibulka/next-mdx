import React from 'react';

import Image from 'src/blocks/image/Image';

import LinkLocalizedServer from 'src/components/link-localized/LinkLocalizedServer';
import MaxWidthEscape from 'src/components/max-width-escape/MaxWidthEscape';
import Paper from 'src/components/paper/Paper';

import { MdxArticleParsed } from 'src/types/mdx';

const ArticlesView = (props: { articles: MdxArticleParsed[] }) => (
  <MaxWidthEscape className="flex justify-center px-4" maxWidth="100em">
    <Paper as="section" className="p-4 not-prose coat-paper">
      <ul className="grid grid-cols-3 gap-x-8 not-prose">
        {props.articles.map((article) => (
          <li key={article.slug} className="not-prose">
            <article>
              <LinkLocalizedServer href={article.href} className="block">
                <Image
                  src={article.photoMdx?.src || null}
                  height={article.photoMdx?.height || null}
                  width={article.photoMdx?.width || null}
                  alt="I am the alt of the image"
                />
              </LinkLocalizedServer>
              <h3 className="text-xl font-bold mb-4">
                <LinkLocalizedServer href={article.href} className="underline">
                  {article.title}
                </LinkLocalizedServer>
              </h3>
              <p>{article.excerpt || 'No excerpt'}</p>
            </article>
          </li>
        ))}
      </ul>
    </Paper>
  </MaxWidthEscape>
);

export default ArticlesView;
