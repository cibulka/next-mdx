import { Mdx } from 'src/types/mdx';

import ArticlesView from './components/ArticlesView';

export type ArticlesData = {
  articles: Mdx[];
};

function Articles(props: { count: number } & ArticlesData) {
  return <ArticlesView articles={props.articles} />;
}

export default Articles;
