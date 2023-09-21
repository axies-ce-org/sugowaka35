import type { Question } from './index';

const highlightClassNames = [
  '!bg-orange-600',
  '!border-orange-600',
  '!text-white',
  '[&>span]:!bg-white',
  '[&>span]:!text-orange-600',
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

export const resetChoices = (choices: NodeListOf<HTMLButtonElement>) => {
  choices.forEach((element) => {
    element.classList.remove(...highlightClassNames);
  });
};
