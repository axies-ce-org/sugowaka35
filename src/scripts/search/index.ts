import { fetchPageData, resetResult, insertResult } from './displayResult';
import { highlightSearchWord, getTextNodes, scrollToSearchWord } from './highlightResult';

type PageData = {
  title: string;
  pageDir: string;
  contents: string[];
};

(async () => {
  const resultBlock = document.querySelector<HTMLDivElement>('.js-search-result');
  const form = document.querySelector<HTMLFormElement>('.js-search-form');
  const input = form.querySelector<HTMLInputElement>('input');
  const submitButton = form.querySelector<HTMLButtonElement>('button');

  const pageData: PageData[] = await fetchPageData();

  input.disabled = false;

  resetResult(resultBlock);

  input.addEventListener('input', (e) => {
    if (!(e.currentTarget instanceof HTMLInputElement)) return;

    const isEmpty = e.currentTarget.value === '';
    submitButton.disabled = isEmpty;

    if (isEmpty) {
      resetResult(resultBlock);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchWord = input.value;
    if (searchWord === '') return;

    const escapedSearchWord = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    resetResult(resultBlock);
    insertResult(pageData, escapedSearchWord, resultBlock);
  });

  const highlightResult = () => {
    const mainElement = document.querySelector('main');
    const params = new URL(document.location.href).searchParams;
    const searchParam = params.get('s');
    const indexParam = Number(params.get('i'));

    // Get text nodes recursively
    const textNodes: Node[] = [];
    getTextNodes(mainElement, textNodes);

    textNodes.forEach((textNode) => {
      highlightSearchWord(textNode, searchParam);
    });

    scrollToSearchWord(indexParam);
  };

  highlightResult();
})();
