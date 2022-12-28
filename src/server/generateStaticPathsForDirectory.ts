import path from 'path';
import fs from 'fs';
import getLocales from 'src/helpers/getLocales';

export default function generateStaticPathsForDirectory(dirpath: string) {
  const locales = getLocales();
  const filesMain = fs.readdirSync(dirpath);

  let result: { locale: string; slug: string }[] = [];
  for (let localeIndex = 0; localeIndex < locales.length; localeIndex += 1) {
    const locale = locales[localeIndex];
    for (let fileIndex = 0; fileIndex < filesMain.length; fileIndex += 1) {
      const filename = filesMain[fileIndex];
      if (path.extname(filename) !== '.mdx') continue;
      result = [...result, { slug: path.basename(filename, '.mdx'), locale }];
    }
  }

  return result;
}
