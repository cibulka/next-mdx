import React from 'react';
import { Mdx } from 'src/types/mdx';

const ArticlesView = (props: { articles: Mdx[] }) => {
  return (
    <section>
      <h2 className="text-xl font-bold">Articles</h2>
      <ul>
        {props.articles.map((article) => (
          <li key={article.slug}>
            <h3>{article.title}</h3>
            <p>{article.excerpt || 'No excerpt'}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArticlesView;
