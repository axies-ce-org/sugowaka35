import type { ResultData } from './index';
import type { Question } from '../../../contents/questions_en';

export const getAnsweredQuestion = (currentQuestion: HTMLDivElement, questions_en: Question[]) => {
  const questionId = Number(currentQuestion?.dataset?.questionId ?? '1');
  return questions_en[questionId - 1];
};

export const getCorrectAnswersCount = (resultData: ResultData) => {
  return Object.values(resultData).filter((result) => result.isCorrect === true).length;
};

export const resetAnswers = (answerBlocks: NodeListOf<HTMLDivElement>) => {
  answerBlocks.forEach((element) => {
    element.classList.remove('!visible', '!h-auto');
  });
};

export const showAnswer = (answerBlock: HTMLDivElement) => {
  answerBlock.classList.add('!visible', '!h-auto');
};
