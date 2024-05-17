import fs from 'node:fs';
import path from 'node:path';
import { node as kirinuki } from 'kirinuki-core';
import astroConfig from '../../astro.config.mjs';

// ページごとにデータを抽出するための kirinuki で使用するスキーマを定義
const schema = {
  title: 'h1',
  sections: 'section',
  modals: '.micromodal-slide',
};

// ビルド後に実行される処理を定義
export default function postbuildIntegration() {
  return {
    name: 'postbuild-integration',
    hooks: {
      'astro:build:done': async () => {
        const siteUrl = import.meta.env.VITE_SITE_URL ?? astroConfig.site;
        const outputDir = 'static';
        const excludePaths = ['_astro', 'assets', 'quiz', 'extra', 'en'];

        const getPageData = async () => {
          // excludePaths を除くディレクトリ名を配列で取得
          const slugs = fs.readdirSync(outputDir).filter((file) => !excludePaths.includes(file) && !file.includes('.'));

          const pageData = await Promise.all(
            slugs.map(async (slug) => {
              const href = `${siteUrl}${slug}`;
              const htmlFilePath = path.join(outputDir, slug, 'index.html');
              if (fs.existsSync(htmlFilePath)) {
                const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
                // kirinuki でページごとにデータを抽出
                const result = await kirinuki(schema, htmlContent);
                return { href, ...result };
              }
              return null;
            }),
          );

          // pageData から falsy な値を削除して JSON ファイルに書き込む
          fs.writeFileSync(path.join(outputDir, 'pagedata.json'), JSON.stringify(pageData.filter(Boolean), null, 2));
        };

        await getPageData().catch(console.error);
      },
    },
  };
}
