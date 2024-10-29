import {
  setSearchAreaState,
  setSearchAreaTopPosition,
  setSearchAreaWidthValue,
  setSearchTriggerState,
} from './searchArea';
import { fetchPageData, resetResult, insertResult } from './displayResult';
import { highlightSearchWord, getAllTextNodes, scrollToSearchWord } from './highlightResult';

type PageData = {
  title: string;
  pageDir: string;
  contents: string[];
};

(async () => {
  const form = document.querySelector<HTMLFormElement>('.js-search-form');
  const input = form.querySelector<HTMLInputElement>('input');
  const submitButton = form.querySelector<HTMLButtonElement>('button');
  const trigger = document.querySelector<HTMLButtonElement>('.js-search-trigger');
  const closeTrigger = document.querySelector<HTMLButtonElement>('.js-close-trigger-search');
  const resultBlock = document.querySelector<HTMLDivElement>('.js-search-result');
  const searchArea = document.querySelector<HTMLDivElement>('.js-search-area');
  const overlay = document.querySelector<HTMLDivElement>('.js-search-overlay');
  const sectionContent = document.querySelector('.section-content');

  const searchParam = new URLSearchParams(window.location.search).get('s');
  const indexParam = Number(new URLSearchParams(window.location.search).get('i'));

  const pageData: PageData[] = await fetchPageData();

  /**
   * Toggle search area
   */
  let isActive = false;

  const toggleSearchArea = () => {
    isActive = !isActive;
    setSearchAreaState(searchArea, isActive);
    setSearchTriggerState(trigger, isActive);
  };

  const openSearchArea = () => {
    isActive = true;
    setSearchAreaState(searchArea, true);
    setSearchTriggerState(trigger, true);
  };

  const closeSearchArea = () => {
    isActive = false;
    setSearchAreaState(searchArea, false);
    setSearchTriggerState(trigger, false);
  };

  const resizeObserver = new ResizeObserver(() => {
    setSearchAreaWidthValue(searchArea);
  });
  resizeObserver.observe(document.documentElement);

  [trigger, closeTrigger, overlay].forEach((element) => {
    element?.addEventListener('click', toggleSearchArea);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isActive) {
      closeSearchArea();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleSearchArea();
    }
  });

  // If there is a search parameter, display search results
  if (searchParam) {
    input.value = searchParam;
    submitButton.disabled = false;
    insertResult(pageData, searchParam, resultBlock);
    openSearchArea();
  } else {
    submitButton.disabled = true;
    resetResult(resultBlock);
  }

  // Set the position of the search area
  setSearchAreaTopPosition();
  window.addEventListener('scroll', setSearchAreaTopPosition);

  /**
   * Display search result
   */
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
  const textNodes = getAllTextNodes(sectionContent);
  textNodes.forEach((textNode) => {
    highlightSearchWord(textNode, searchParam);
  });

  scrollToSearchWord(indexParam);
})();
