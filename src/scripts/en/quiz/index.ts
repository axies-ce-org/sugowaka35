import questions from '../../../contents/questions_en';

import {
  disableChoices,
  enableChoices,
  getSelectedChoiceNumber,
  highlightCorrectChoice,
  highlightSelectedWrongChoice,
  resetChoices,
} from './quizChoice';

import { getCorrectAnswersCount, getAnsweredQuestion, resetAnswers, showAnswer } from './quizAnswer';

import {
  hideElement,
  getResultContent,
  resetCorrectAnswersResultkChildren,
  resetIllustration,
  resetResultBlock,
  resetResultContentBlock,
  showElement,
  showResult,
  updateCorrectAnswersNumberSpan,
  updateIllustration,
  updateJudgement,
  updateMessageBlock,
} from './quizResult';

import { setBrowserId, setResultData, sendData } from './quizData';

export interface ResultData {
  [x: string]: {
    answer: number;
    isCorrect: boolean;
  };
}

let resultData: ResultData = {};
let isComplete = false;

const POST_ENDPOINT = import.meta.env.PUBLIC_POST_ENDPOINT ?? '';

const answerBlocks = document.querySelectorAll<HTMLDivElement>('.js-answer');
const container = document.querySelector<HTMLDivElement>('.js-container');
const choices = document.querySelectorAll<HTMLButtonElement>('.js-choice');
const resultBlock = document.querySelector<HTMLDivElement>('.js-result');
const resultContentBlock = document.querySelector<HTMLDivElement>('.js-result-content');
const correctAnswersBlock = document.querySelector<HTMLDivElement>('.js-correct-answers');
const allCorrectBlock = document.querySelector<HTMLDivElement>('.js-all-correct');
const correctAnswersNumberSpan = document.querySelector<HTMLSpanElement>('.js-correct-answers-number');
const messageBlock = document.querySelector<HTMLDivElement>('.js-message');
const illustrationImage = document.querySelector<HTMLImageElement>('.js-illustration');
const submitButton = document.querySelector<HTMLButtonElement>('.js-submit-answer]');
const resetButton = document.querySelector<HTMLButtonElement>('.js-reset');

const onClickChoice = (clickedChoice: HTMLButtonElement) => {
  const currentQuestion = clickedChoice.closest<HTMLDivElement>('.js-question');
  const currentChoices = currentQuestion!.querySelectorAll<HTMLButtonElement>('.js-choice');
  const currentChoicedNumber = Number(clickedChoice.dataset.choiceNumber);

  if (!currentQuestion) return;

  const currentAnswerBlock = currentQuestion.querySelector<HTMLDivElement>('.js-answer');

  const answeredQuestion = getAnsweredQuestion(currentQuestion, questions);
  const isCorrect = answeredQuestion.correctAnswerNumber === getSelectedChoiceNumber(clickedChoice);

  const enableSumbit = () => {
    if (!submitButton) return;
    submitButton.removeAttribute('disabled');
  };

  if (!currentAnswerBlock) return;

  showAnswer(currentAnswerBlock);
  updateJudgement(currentAnswerBlock, isCorrect);
  highlightCorrectChoice(answeredQuestion, currentChoices);
  highlightSelectedWrongChoice(clickedChoice, isCorrect);
  disableChoices(currentChoices);
  setResultData(currentChoicedNumber, resultData, answeredQuestion.questionId, isCorrect);

  currentAnswerBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });

  if (Object.keys(resultData).length === questions.length) isComplete = true;
  isComplete && enableSumbit();
};

const onClickSubmit = async () => {
  const correctAnswersCount = getCorrectAnswersCount(resultData);
  const correctRatio = correctAnswersCount / questions.length;
  const isAllCorrect = correctRatio === 1;
  const { messageContent, imageFileName } = getResultContent(correctRatio);

  const disableSubmit = () => {
    if (!submitButton) return;
    submitButton.setAttribute('disabled', 'disabled');
  };

  disableSubmit();

  if (
    !correctAnswersBlock ||
    !correctAnswersNumberSpan ||
    !allCorrectBlock ||
    !messageBlock ||
    !illustrationImage ||
    !resultBlock ||
    !resultContentBlock
  )
    return;

  if (isAllCorrect) {
    hideElement(correctAnswersBlock);
  } else {
    hideElement(allCorrectBlock);
    updateCorrectAnswersNumberSpan(correctAnswersNumberSpan, correctAnswersCount);
  }

  updateMessageBlock(messageContent, messageBlock);
  await updateIllustration(isAllCorrect, imageFileName, illustrationImage);
  showResult(isAllCorrect, resultBlock, resultContentBlock);
  resultBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });

  setBrowserId();
  POST_ENDPOINT && sendData(resultData, POST_ENDPOINT);
};

const onClickReset = () => {
  if (!correctAnswersBlock || !illustrationImage || !resultBlock || !resultContentBlock || !allCorrectBlock) return;

  resetAnswers(answerBlocks);
  resetChoices(choices);
  resetCorrectAnswersResultkChildren(correctAnswersBlock);
  resetIllustration(illustrationImage);
  resetResultBlock(resultBlock);
  resetResultContentBlock(resultContentBlock);
  showElement(allCorrectBlock);
  showElement(correctAnswersBlock);
  enableChoices(choices);
  container!.scrollIntoView({ behavior: 'smooth', block: 'start' });

  resultData = {};
  isComplete = false;
};

choices.forEach((choice) => {
  choice.addEventListener('click', ({ currentTarget }) => {
    if (!(currentTarget instanceof HTMLButtonElement)) return;
    onClickChoice(currentTarget);
  });
});

submitButton?.addEventListener('click', (event) => {
  event.preventDefault();
  onClickSubmit();
});

resetButton?.addEventListener('click', () => {
  onClickReset();
});
