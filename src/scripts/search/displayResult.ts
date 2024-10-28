type PageData = {
  title: string;
  pageDir: string;
  contents: string[];
};

const siteUrl = import.meta.env.PROD ? import.meta.env.PUBLIC_SITE_URL ?? import.meta.env.SITE : '';
const isEN = document.documentElement.lang === 'en';

const getMatches = (text: string, searchWord: string) => {
  const matches = text.match(new RegExp(`[^。！？\\n]*${searchWord}[^。！？\\n]*[。！？]?`, 'gi')) ?? [];
  return matches.map((match) => match.trim());
};

export const fetchPageData = async () => {
  /*
   * If you want to specify siteUrl (e.g. for staging environment),
   * set PUBLIC_SITE_URL in .env or use CLI with this environment variable.
   * For more information, refer to:
   * https://docs.astro.build/en/guides/environment-variables/#using-the-cli
   */
  const response = await fetch(`${siteUrl}/pagedata-${isEN ? 'en' : 'ja'}.json`);
  return await response.json();
};

export const resetResult = (resultBlock: HTMLDivElement) => {
  resultBlock.innerHTML = '';
  resultBlock.classList.remove('is-active');
};

export const insertResult = (pageData: PageData[], searchWord: string, resultBlock: HTMLDivElement) => {
  let hasResult = false;

  resultBlock.classList.add('is-active');

  pageData.forEach(({ title, pageDir, contents }) => {
    const matchSentences = [];
    contents.forEach((paragraph) => {
      matchSentences.push(...getMatches(paragraph, searchWord));
    });

    if (matchSentences.length > 0) {
      hasResult = true;
      resultBlock.insertAdjacentHTML('afterbegin', '<ul></ul>');
      resultBlock.insertAdjacentHTML('afterbegin', `<div>${title}</div>`);

      matchSentences.forEach((matchSentence, index) => {
        const params = new URLSearchParams();
        const spannedSentence = matchSentence.replaceAll(
          new RegExp(`(${searchWord})`, 'gi'),
          `<span class="js-hit">$1</span>`,
        );
        params.set('s', searchWord);
        params.set('i', (index + 1).toString());
        resultBlock.querySelector('ul').insertAdjacentHTML(
          'beforeend',
          `<li>
          <a href="${siteUrl}${isEN ? '/en/' : '/'}${pageDir}/?${params.toString()}">${spannedSentence}</a>
        </li>`,
        );
      });
    }
  });

  if (!hasResult) {
    resultBlock.insertAdjacentHTML(
      'afterbegin',
      `<p class="js-no-result">${isEN ? 'No results found.' : '検索結果が見つかりませんでした。'}</p>`,
    );
  }
};
