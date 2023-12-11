import type { Question } from '../../../contents/questions_en';

const highlightClassNames = [
  '!bg-orange-600',
  '!border-orange-600',
  '!text-white',
  '[&>span]:!bg-white',
  '[&>span]:!text-orange-600',
];

const highlightWrongClassNames = [
  '!bg-zinc-500',
  '!border-zinc-500',
  '!text-white',
  '[&>span]:!bg-white',
  '[&>span]:!text-zinc-500',
];

export const disableChoices = (currentChoice: NodeListOf<HTMLButtonElement>) => {
  currentChoice.forEach((choice) => {
    choice.setAttribute('disabled', 'disabled');
    choice.classList.add('cursor-not-allowed');
  });
};

export const enableChoices = (choices: NodeListOf<Element>) => {
  choices.forEach((choice) => {
    choice.removeAttribute('disabled');
    choice.classList.remove('cursor-not-allowed');
  });
};

export const getSelectedChoiceNumber = (clickedChoice: HTMLButtonElement) => Number(clickedChoice.dataset.choiceNumber);

export const highlightCorrectChoice = (answeredQuestion: Question, currentChoices: NodeListOf<HTMLButtonElement>) => {
  const correctChoice = currentChoices[answeredQuestion.correctAnswerNumber - 1];

  correctChoice.classList.add(...highlightClassNames);
};

export const highlightSelectedWrongChoice = (clickedChoice: HTMLButtonElement, isCorrect: boolean) => {
  if (!isCorrect) {
    clickedChoice.classList.add(...highlightWrongClassNames);
  }
};

export const resetChoices = (choices: NodeListOf<HTMLButtonElement>) => {
  choices.forEach((element) => {
    element.classList.remove(...highlightClassNames, ...highlightWrongClassNames);
  });
};
