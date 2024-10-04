import fs from 'node:fs';
import path from 'node:path';
import { loadBuffer } from 'cheerio';

type PageData = {
  pageDir: string;
  title: string;
  paragraphs: string[];
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
  const { title, paragraphs } = loadBuffer(htmlContent).extract({
    title: 'h2',
    paragraphs: ['section p:not([data-search-ignore])'],
  });

  return { title: title.trim(), paragraphs: paragraphs.map((p) => p.trim()) };
};

const generatePageData = (lang: string): void => {
  const parentDir = lang === 'ja' ? 'static' : 'static/en';
  const pageDirs = getPageDirs(parentDir);

  const pageData = pageDirs.map((pageDir) => {
    const htmlFilePath = path.join(parentDir, pageDir, 'index.html');
    const result = extractPageData(htmlFilePath);
    return result ? { pageDir, ...result } : null;
  });

  // Generate pagedata.json for static and public
  ['static', 'public'].forEach((dir) => {
    const outputFileName = path.join(dir, `pagedata${'-' + lang}.json`);
    fs.writeFileSync(outputFileName, JSON.stringify(pageData, null, 2));
    console.log(`${outputFileName} is generated`);
  });
};

generatePageData('ja');
generatePageData('en');
