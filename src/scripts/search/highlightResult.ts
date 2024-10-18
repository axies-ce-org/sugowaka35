export const highlightSearchWord = (sentenceNode: Node, searchWord: string) => {
  if (sentenceNode.nodeValue.trim() === '') return;

  const regex = new RegExp(`(${searchWord})`, 'gi');
  const sentence = sentenceNode.nodeValue
    .trim()
    .replace(/\s{2,}/, ' ')
    .replace('\n', '');
  // Split the text node using regex to partially highlight it
  const sentenceParts = sentence.split(regex);

  if (sentenceParts.length > 1) {
    // Create a fragment to process sentence parts of a text node
    const fragment = document.createDocumentFragment();

    // If the part matches the search word, wrap it in a span, otherwise add it as is
    sentenceParts.forEach((part) => {
      if (regex.test(part)) {
        const span = document.createElement('span');
        span.className = 'js-hit font-bold text-orange-600 bg-yellow-100';
        span.textContent = part;
        fragment.appendChild(span);
      } else {
        fragment.appendChild(document.createTextNode(part));
      }
    });

    // Replace the existing text node with the highlighted one
    sentenceNode.parentNode.replaceChild(fragment, sentenceNode);
  }
};

export const getTextNodes = (targetRootElement: Node, textNodes: Node[]) => {
  if (!targetRootElement) return;

  targetRootElement.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      if (child.nodeValue.trim() !== '') {
        textNodes.push(child);
      }
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      getTextNodes(child, textNodes);
    }
  });
};

export const scrollToSearchWord = (indexParam: number) => {
  document.querySelectorAll('.js-hit').forEach((el, i) => {
    if (i === indexParam) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  });
};
