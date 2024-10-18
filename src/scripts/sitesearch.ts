type PageData = {
  title: string;
  pageDir: string;
  paragraphs: string[];
};

const displaySearchResult = () => {
  const resultBlock = document.querySelector<HTMLDivElement>('.js-search-result');
  const form = document.querySelector<HTMLFormElement>('.js-search-form');
  const input = form.querySelector<HTMLInputElement>('input');

  let pageData: PageData[] = [];

  const fetchPageData = async () => {
    /*
     * If you want to specify siteUrl (e.g. for staging environment),
     * set PUBLIC_SITE_URL in .env or use CLI with this environment variable.
     * For more information, refer to:
     * https://docs.astro.build/en/guides/environment-variables/#using-the-cli
     */
    const siteUrl = import.meta.env.PROD ? import.meta.env.PUBLIC_SITE_URL ?? import.meta.env.SITE : '';
    const isEN = document.documentElement.lang === 'en';
    const response = await fetch(`${siteUrl}/pagedata-${isEN ? 'en' : 'ja'}.json`);
    pageData = await response.json();
    input.disabled = false;
  };

  const resetResult = (resultBlock: HTMLDivElement) => {
    resultBlock.innerHTML = '';
    resultBlock.classList.add('invisible');
    resultBlock.classList.remove('pt-4');
  };

  const getMatches = (text: string, searchWord: string) => {
    const escapedSearchWord = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matches = text.match(new RegExp(`[^。！？\\n]*${escapedSearchWord}[^。！？\\n]*[。！？]?`, 'gi'));
    if (!matches) return [];
    return matches.map((match) => match.trim());
  };

  fetchPageData();

  input.addEventListener('input', (e) => {
    const submitButton = form.querySelector<HTMLButtonElement>('button');
    if (!(e.currentTarget instanceof HTMLInputElement)) return;

    const isEmpty = e.currentTarget.value === '';
    submitButton.disabled = isEmpty;

    if (isEmpty) {
      resetResult(resultBlock);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasResult = false;
    const searchWord = input.value;

    if (searchWord === '') return;

    resetResult(resultBlock);

    resultBlock.classList.remove('invisible');
    resultBlock.classList.add('pt-4');

    pageData.forEach(({ title, pageDir, paragraphs }) => {
      const matchSentences = [];
      paragraphs.forEach((paragraph) => {
        matchSentences.push(...getMatches(paragraph, searchWord));
      });

      if (matchSentences.length > 0) {
        hasResult = true;
        resultBlock.insertAdjacentHTML('afterbegin', '<ul></ul>');
        resultBlock.insertAdjacentHTML('afterbegin', `<div class="text-lg font-bold [*+&]:mt-4">${title}</div>`);

        matchSentences.forEach((matchSentence, index) => {
          const params = new URLSearchParams(location.search);
          const spannedSentence = matchSentence.replaceAll(
            new RegExp(`(${searchWord})`, 'gi'),
            `<span class="js-hit font-bold text-orange-600 bg-yellow-100">$1</span>`,
          );
          params.set('s', searchWord);
          params.set('i', index.toString());
          resultBlock.querySelector('ul').insertAdjacentHTML(
            'beforeend',
            `<li class="border-t border-orange-300">
              <a class="p-2 block hover:bg-orange-300" href="/${pageDir}/?${params.toString()}">${spannedSentence}</a>
            </li>`,
          );
        });
      }
    });

    if (!hasResult) {
      resultBlock.insertAdjacentHTML('afterbegin', '<p class="js-no-result">検索結果が見つかりませんでした。</p>');
    }
  });
};

const highlightSearchResult = () => {
  /**
   * パラメータから情報を取得し、検索結果のハイライト・スクロールを行う
   */
  const params = new URL(document.location.href).searchParams;
  const search = params.get('s');
  const index = Number(params.get('i'));

  const mainElement = document.querySelector('main');
  if (mainElement && search) {
    const regex = new RegExp(`(${search})`, 'gi');

    const highlightText = (node) => {
      if (node.nodeValue.trim() === '') {
        return;
      }
      const text = node.nodeValue
        .trim()
        .replace(/\s{2,}/, ' ')
        .replace('\n', '');
      // テキストノードを部分的にハイライトするために正規表現で分割
      const parts = text.split(regex);

      if (parts.length > 1) {
        // テキストノードのパーツを加工して追加するための fragment を作成
        const fragment = document.createDocumentFragment();

        // 検索ワードと一致する場合はテキストノードのパーツを span で囲み、それ以外はそのまま追加
        parts.forEach((part) => {
          if (regex.test(part)) {
            const span = document.createElement('span');
            span.className = 'js-hit font-bold text-orange-600 bg-yellow-100';
            span.textContent = part;
            fragment.appendChild(span);
          } else {
            fragment.appendChild(document.createTextNode(part));
          }
        });

        // 既存のテキストノードをハイライトしたものに置換
        node.parentNode.replaceChild(fragment, node);
      }
    };

    // 再帰的にテキストノードを取得
    const textNodes = [];
    const getTextNodes = (element) => {
      element.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          textNodes.push(child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          getTextNodes(child);
        }
      });
    };

    getTextNodes(mainElement);

    textNodes.forEach((node) => {
      highlightText(node);
    });

    document.querySelectorAll('.js-hit').forEach((el, i) => {
      if (i === index) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    });
  }
};

displaySearchResult();
highlightSearchResult();
