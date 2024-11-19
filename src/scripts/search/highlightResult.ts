import { createSentenceRegex, createWordRegex } from './utils';

export const highlightSearchWord = (textNode: Node, searchWord: string): void => {
  if (textNode.textContent.trim() === '') return;

  const processedSentence = textNode.textContent
    .replace(createSentenceRegex(searchWord), '<span>$&</span>')
    .replace(createWordRegex(searchWord), '<span class="js-hit text-orange-600 bg-yellow-100">$1</span>');

  const fragment = document.createRange().createContextualFragment(processedSentence);

  textNode.parentNode.replaceChild(fragment, textNode);
};

export const getAllTextNodes = (targetNode: Node): Node[] => {
  if (!targetNode) return [];

  const allTextNodes: Node[] = [];

  const getTextNodes = (targetNode: Node) => {
    targetNode.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        if (child.nodeValue.trim() !== '') {
          allTextNodes.push(child);
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        getTextNodes(child);
      }
    });
  };

  getTextNodes(targetNode);

  return allTextNodes;
};

export const scrollToSearchWord = (indexParam: number): void => {
  const hitElementParents = Array.from(document.querySelectorAll('.js-hit')).map((el) => el.parentElement);
  const deduplicatedHitElementParents = [...new Set(hitElementParents)];

  deduplicatedHitElementParents.forEach((el, i) => {
    if (i + 1 === indexParam && el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  });
};

export const highlightResult = (): void => {
  const searchIndex = Number(new URLSearchParams(window.location.search).get('i'));
  if (!searchIndex) return;

  const paths = window.location.pathname
    .replace(/^\/|\/$/g, '')
    .split('/')
    .filter((path) => path !== '');
  const container = document.querySelector<HTMLElement>(`[data-page-dir="${paths.at(-1)}"]`);
  if (!container) return;

  const targetResult = container.querySelectorAll('li')[searchIndex - 1];
  if (!targetResult) return;

  targetResult.classList.add('is-searched');
  targetResult.scrollIntoView({
    behavior: 'instant',
    block: 'start',
  });
};
