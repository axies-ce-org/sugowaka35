import type { ResultData } from './index';
import type { Question } from '../../contents/questions';

export const getAnsweredQuestion = (currentQuestion: HTMLDivElement, questions: Question[]) => {
  const questionId = Number(currentQuestion?.dataset?.questionId ?? '1');
  return questions[questionId - 1];
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
