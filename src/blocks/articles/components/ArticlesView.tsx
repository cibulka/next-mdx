import React from 'react';

import Image from 'src/blocks/image/Image';
import Paper from 'src/components/paper/Paper';
import { MdxArticleParsed } from 'src/types/mdx';
import LinkLocalizedServer from 'src/components/link-localized/LinkLocalizedServer';

const ArticlesView = (props: { articles: MdxArticleParsed[] }) => (
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
);

export default ArticlesView;
