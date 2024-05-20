const siteUrl = import.meta.env.PUBLIC_OVERRIDE_SITE_URL ?? import.meta.env.SITE ?? '';

/**
 * 検索フォームの入力値に応じて検索結果を表示
 */
let pageData = [];

const resultBlock = document.querySelector('.js-search-result');
const form = document.querySelector('.js-search-form');
const input = form.querySelector('input');
const submitButton = form.querySelector('button');

const resetResult = () => {
  resultBlock.innerHTML = '';
  resultBlock.classList.add('invisible');
  resultBlock.classList.remove('pt-4');
};

fetch(`${siteUrl}/pagedata.json`)
  .then((response) => response.json())
  .then((data) => {
    pageData = data;
    input.disabled = false;
  });

input.addEventListener('input', (e) => {
  if (!(e.currentTarget instanceof HTMLInputElement)) return;
  submitButton.disabled = e.currentTarget.value === '';
  if (e.currentTarget.value === '') {
    resetResult();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let hasResult = false;
  const searchWord = input.value;

  if (searchWord === '') {
    return;
  }

  if (document.querySelector('.js-no-result')) {
    document.querySelector('.js-no-result').remove();
  }

  resetResult();

  resultBlock.classList.remove('invisible');
  resultBlock.classList.add('pt-4');

  const getMatches = (type, text, searchWord) => {
    const excludedPattern = /Memo|閉じる/g;
    const matches = text.match(new RegExp(`[^。！？\\n]*${searchWord}[^。！？\\n]*[。！？]?`, 'gi')) || [];
    return matches.map((match) => ({ type, string: match.replace(excludedPattern, '').trim() }));
  };

  pageData.forEach(({ title, href, sections, modals }) => {
    const sentenceList = [];
    const modalList = [];
    sections.forEach((section) => {
      const matches = getMatches('sentence', section, searchWord);
      if (matches.length > 0) {
        sentenceList.push(...matches);
      }
    });
    modals.forEach((modal) => {
      const matches = getMatches('modal', modal, searchWord);
      if (matches.length > 0) {
        modalList.push(...matches);
      }
    });
    // モーダルに含まれる文を除外
    const filteredSentenceList = sentenceList.filter(({ string }) => {
      return !modalList.some((modal) => modal.string.includes(string));
    });
    // モーダルに含まれる文を除外した一文とモーダルを統合
    const allMatches = [...filteredSentenceList, ...modalList];

    if (allMatches.filter((match) => match.type === 'sentence').length > 0) {
      resultBlock.insertAdjacentHTML('afterbegin', '<ul></ul>');
      resultBlock.insertAdjacentHTML('afterbegin', `<div class="text-lg font-bold [*+&]:mt-4">${title}</div>`);

      let index = 0;
      for (const { type, string } of allMatches) {
        // ひとまずモーダルに関しては検索結果に表示しない
        if (type === 'modal') {
          continue;
        }

        hasResult = true;

        const params = new URLSearchParams(location.search);
        const spannedSentence = string.replaceAll(
          new RegExp(`(${searchWord})`, 'gi'),
          `<span class="js-hit font-bold text-orange-600 bg-yellow-100">$1</span>`,
        );
        params.set('s', searchWord);
        params.set('i', index.toString());
        resultBlock.querySelector('ul').insertAdjacentHTML(
          'beforeend',
          `<li class="border-t border-orange-300">
            <a class="p-2 block hover:bg-orange-300" href="${href}?${params.toString()}">${spannedSentence}</a>
          </li>`,
        );
        index++;
      }
    }
  });

  if (!hasResult) {
    resultBlock.insertAdjacentHTML('afterbegin', '<p class="js-no-result">検索結果が見つかりませんでした。</p>');
  }
});

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
