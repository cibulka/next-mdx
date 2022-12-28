import { MdxArticleParsed } from 'src/types/mdx';

import ArticlesView from './components/ArticlesView';

export type ArticlesData = {
  articles: MdxArticleParsed[];
};

function Articles(props: { category?: string; count: number } & ArticlesData) {
  return <ArticlesView articles={props.articles} />;
}

export default Articles;
