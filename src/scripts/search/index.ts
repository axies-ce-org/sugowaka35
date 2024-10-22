import { toggleSearchArea } from './searchArea';
import { fetchPageData, resetResult, insertResult } from './displayResult';
import { highlightSearchWord, getTextNodes, scrollToSearchWord } from './highlightResult';

type PageData = {
  title: string;
  pageDir: string;
  contents: string[];
};

(async () => {
  /**
   * Toggle search area
   */
  const searchArea = document.querySelector<HTMLDivElement>('.js-search-area');
  const trigger = document.querySelector<HTMLButtonElement>('.js-search-trigger');
  const closeTrigger = document.querySelector<HTMLButtonElement>('.js-close-trigger-search');
  const overlay = document.querySelector<HTMLDivElement>('.js-search-overlay');

  [trigger, closeTrigger, overlay].forEach((element) => {
    element.addEventListener('click', () => toggleSearchArea(searchArea));
  });

  document.addEventListener('keydown', (e) => {
    const isActive = searchArea.classList.contains('is-active');
    if (isActive && e.key === 'Escape') toggleSearchArea(searchArea);
  });

  // toggle search area when press command(ctrl)+k
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleSearchArea(searchArea);
    }
  });

  /**
   * Display search result
   */
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

    isEmpty && resetResult(resultBlock);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchWord = input.value;

    if (searchWord === '') return;

    const escapedSearchWord = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    resetResult(resultBlock);
    insertResult(pageData, escapedSearchWord, resultBlock);
  });

  /**
   * Highlight search word
   */
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
})();
