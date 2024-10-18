import fs from 'node:fs';
import path from 'node:path';
import { loadBuffer } from 'cheerio';

type PageData = {
  pageDir: string;
  title: string;
  contents: string[];
};

const getPageDirs = (parentDir: string): string[] => {
  const excludePaths = ['_astro', 'assets', 'extra', 'quiz', 'en'];
  const allPaths = fs.readdirSync(parentDir);
  const validPaths = allPaths.filter((pathName) => !excludePaths.includes(pathName));

  return validPaths.filter((pathName) => {
    const fullPath = path.join(parentDir, pathName);
    return fs.statSync(fullPath).isDirectory();
  });
};

const extractPageData = (htmlFilePath: string): Omit<PageData, 'pageDir'> => {
  if (!fs.existsSync(htmlFilePath)) {
    console.warn(`File not found: ${htmlFilePath}`);
    return null;
  }

  const htmlContent = fs.readFileSync(htmlFilePath);
  const { title, contents } = loadBuffer(htmlContent).extract({
    title: 'h2',
    contents: ['.section-content:not([data-search-ignore])'],
  });

  return { title: title.trim(), contents: contents.map((c) => c.trim()) };
};

const generatePageData = (lang = 'ja'): void => {
  const parentDir = lang === 'ja' ? 'static' : 'static/en';
  const pageDirs = getPageDirs(parentDir);

  const pageData = pageDirs.map((pageDir) => {
    const htmlFilePath = path.join(parentDir, pageDir, 'index.html');
    const result = extractPageData(htmlFilePath);
    return result ? { pageDir, ...result } : null;
  });

  // Generate pagedata.json for static and public
  ['static', 'public'].forEach((dir) => {
    const outputFileName = path.join(dir, `pagedata-${lang}.json`);
    fs.writeFileSync(outputFileName, JSON.stringify(pageData, null, 2));
    console.log(`${outputFileName} is generated`);
  });
};

['ja', 'en'].forEach((lang) => {
  generatePageData(lang);
});
