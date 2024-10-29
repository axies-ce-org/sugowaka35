export const createSentenceRegex = (searchWord: string): RegExp => {
  return new RegExp(`[^。！？.\\n]*${searchWord}[^。！？.\\n]*[。！？.]?`, 'gi');
};

export const createWordRegex = (searchWord: string): RegExp => {
  return new RegExp(`(${searchWord})`, 'gi');
};
