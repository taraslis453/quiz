import React, { useState } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import {
  QuestionsObjectWithRandomizedAnswers,
  getTriviaData,
} from "./features/quiz/api";
import { Card } from "./features/quiz/organisms/";
import {
  Grid,
  Typography,
  Button,
  Box,
  LinearProgress,
  Paper,
} from "@material-ui/core";

export type AnswerObj = {
  question: string;
  correct: boolean;
  correct_answer: string;
  answer: string;
};

const TOTAL_QUESTIONS = 10;

export default function App() {
  const [gameOver, setGameOver] = useState(true);
  const [quizData, setQuizData] = useState<
    QuestionsObjectWithRandomizedAnswers[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);

  const startTrivia = async () => {
    setGameOver(false);
    setLoading(true);
    let data = await getTriviaData(TOTAL_QUESTIONS);
    setQuizData(data);
    setQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    let correct =
      quizData[questionIndex].correct_answer === e.currentTarget.value;

    let userAnswerObj: AnswerObj = {
      correct,
      question: quizData[questionIndex].question,
      correct_answer: quizData[questionIndex].correct_answer,
      answer: e.currentTarget.value,
    };

    setUserAnswers((prev) => [...prev, userAnswerObj]);
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (TOTAL_QUESTIONS === questionIndex + 1) {
      setGameOver(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ textAlign: "center", height: "100vh" }}
      >
        <Box width="50">
          <Box mb={2}>
            <Typography variant="h2" style={{ textTransform: "uppercase" }}>
              quiz
            </Typography>
          </Box>

          {loading && (
            <Typography variant="h5" color="primary">
              Loading...
            </Typography>
          )}
          {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <Box m={2}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={startTrivia}
              >
                Start
              </Button>
            </Box>
          ) : null}
          {!gameOver && !loading && (
            <Paper variant="outlined">
              <Box p={3}>
                <Typography variant="h5">
                  Question {questionIndex + 1}/{TOTAL_QUESTIONS}
                </Typography>
                <Box m={2}>
                  <LinearProgress
                    variant="determinate"
                    value={(100 / TOTAL_QUESTIONS) * (questionIndex + 1)}
                  />
                </Box>
                <Typography variant="h5">Score: {score}</Typography>
                <Card
                  question={quizData[questionIndex].question}
                  answers={quizData[questionIndex].answers}
                  userAnswer={
                    userAnswers ? userAnswers[questionIndex] : undefined
                  }
                  checkAnswer={checkAnswer}
                />
              </Box>
            </Paper>
          )}
          {!gameOver &&
            !loading &&
            userAnswers[questionIndex] &&
            questionIndex + 1 !== TOTAL_QUESTIONS && (
              <Box m={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={nextQuestion}
                  size="large"
                >
                  Next question
                </Button>
              </Box>
            )}
        </Box>
      </Grid>
    </MuiThemeProvider>
  );
}
