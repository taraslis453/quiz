import axios from "axios";
import { shuffleArray } from "./utils";
export type QuestionObject = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
export type AnswersArray = {
  answers: string[];
};

export type QuestionsObjectWithRandomizedAnswers = QuestionObject &
  AnswersArray;

export const getTriviaData = async (
  amount: number
): Promise<QuestionsObjectWithRandomizedAnswers[]> => {
  let response = await axios.get(
    `https://opentdb.com/api.php?amount=${amount}`
  );
  return response.data.results.map((question: QuestionObject) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
