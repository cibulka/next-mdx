export default function removeExcerptFromContent(content: string, excerpt: string | null) {
  if (!excerpt) return content;
  const contentArr = content.split('---').filter(Boolean);
  if (excerpt.trim() !== contentArr[0].trim()) return content;
  const contentTrimmed = contentArr[1].trimStart();
  return [contentTrimmed, ...contentArr.slice(2)].join('---');
}
