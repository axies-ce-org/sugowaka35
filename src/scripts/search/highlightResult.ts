export const highlightSearchWord = (textNode: Node, searchWord: string): void => {
  if (textNode.textContent.trim() === '') return;

  const sentenceRegex = new RegExp(`[^。！？\\n]*${searchWord}[^。！？\\n]*[。！？]?`, 'gi');
  const wordRegex = new RegExp(`(${searchWord})`, 'gi');

  const processedSentence = textNode.textContent
    .replace(sentenceRegex, '<span>$&</span>')
    .replace(wordRegex, '<span class="js-hit text-orange-600 bg-yellow-100">$1</span>');

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
