const illustrationParentClassNames = ['!-bottom-16', 'md:!justify-center', 'md:!-bottom-24'];

const resultContent = {
  all: {
    messageContent: 'すごーい！',
    imageFileName: 'all',
  },
  above80: {
    messageContent: 'よくできましたね！',
    imageFileName: 'sumiki',
  },
  above40: {
    messageContent: `あとちょっとで<br />もっとよくなるぞ！`,
    imageFileName: 'daiin',
  },
  below40: {
    messageContent: `もうすこし<br />がんばりましょう!`,
    imageFileName: 'konaka',
  },
};

export const getResultContent = (correctRatio: number) => {
  if (correctRatio === 1) {
    return resultContent.all;
  } else if (correctRatio >= 0.8) {
    return resultContent.above80;
  } else if (correctRatio >= 0.4) {
    return resultContent.above40;
  } else {
    return resultContent.below40;
  }
};

export const hideElement = (Element: HTMLElement) => {
  Element.classList.add('hidden');
};

export const showElement = (Element: HTMLElement) => {
  Element.classList.remove('hidden');
};

export const resetCorrectAnswersResultkChildren = (correctAnswersBlock: HTMLDivElement) => {
  correctAnswersBlock.childNodes.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    node.classList.remove('hidden');
  });
};

export const resetResultBlock = (resultBlock: HTMLElement) => {
  resultBlock.classList.remove('!flex', '!flex-col');
};

export const resetResultContentBlock = (resultContentBlock: HTMLDivElement) => {
  if (!resultContentBlock) return;
  resultContentBlock.classList.remove('md:!mb-[7.5rem]');
};

export const resetIllustration = (illustrationImage: HTMLImageElement) => {
  illustrationImage.classList.remove('!max-w-[18.75rem]');
  illustrationImage.parentElement?.classList.remove(...illustrationParentClassNames);
};

export const showResult = (isAllCorrect: boolean, resultBlock: HTMLElement, resultContentBlock: HTMLDivElement) => {
  resultBlock.classList.add('!flex', '!flex-col');
  isAllCorrect && resultContentBlock?.classList.add('md:!mb-[7.5rem]');
};

export const updateCorrectAnswersNumberSpan = (
  correctAnswersNumberSpan: HTMLSpanElement,
  correctAnswersCount: number
) => {
  correctAnswersNumberSpan.innerText = correctAnswersCount.toString();
};

export const updateIllustration = (
  isAllCorrect: boolean,
  imageFileName: string,
  illustrationImage: HTMLImageElement
) => {
  return new Promise<void>((resolve) => {
    if (isAllCorrect) {
      illustrationImage.classList.add('!max-w-[18.75rem]');
      illustrationImage.parentElement?.classList.add(...illustrationParentClassNames);
    }

    illustrationImage.src = '../../assets/images/' + imageFileName + '-quiz.png';
    illustrationImage.onload = () => resolve();
  });
};

export const updateJudgement = (answerBlock: HTMLElement, isCorrect: boolean) => {
  const currentJudgement = answerBlock.querySelector('.js-judgement');
  if (!currentJudgement) return;

  currentJudgement.textContent = isCorrect ? '正解です！' : '残念、不正解です';
  currentJudgement.classList.replace(
    isCorrect ? 'text-zinc-600' : 'text-orange-600',
    isCorrect ? 'text-orange-600' : 'text-zinc-600'
  );
};

export const updateMessageBlock = (messageContent: string, messageBlock: HTMLDivElement) => {
  messageBlock.innerHTML = messageContent;
};
