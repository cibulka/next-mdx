import matterLib from 'gray-matter';

export default function matter(string: string) {
  return matterLib(string, { excerpt: true });
}
