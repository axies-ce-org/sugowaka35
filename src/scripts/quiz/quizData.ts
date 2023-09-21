import questions from '../../contents/questions';
import { getCorrectAnswersCount } from './quizAnswer';
import type { ResultData } from './index';

const getData = (resultData: ResultData) => {
  // Sort based on question number
  const sortedResultArray = Object.entries(resultData).sort((a, b) => {
    if (a[0] > b[0]) {
      return 1;
    } else {
      return -1;
    }
  });
  const sortedResult = Object.fromEntries(sortedResultArray);

  return {
    browserId: localStorage.getItem('browserId'),
    score: getCorrectAnswersCount(resultData) * (100 / questions.length),
    result: sortedResult,
  };
};

export const sendData = async (resultData: ResultData) => {
  try {
    const response = await fetch('/quiz', {
      method: 'POST',
      body: JSON.stringify(getData(resultData)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('API error');
    }
  } catch (error) {
    console.error(error);
  }
};

export const setBrowserId = () => {
  if (localStorage.getItem('browserId')) return;
  const browserId = crypto.randomUUID();
  localStorage.setItem('browserId', browserId);
};

export const setResultData = (resultData: ResultData, answeredQuestionId: number, isCorrect: boolean) => {
  resultData[`question${answeredQuestionId}`] = isCorrect;
};
