import React from "react";
import { AnswerObj } from "App";
import { Box, Button, Typography, useTheme } from "@material-ui/core";

type Props = {
  answers: string[];
  question: string;
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObj | undefined;
};

export const Card: React.FC<Props> = ({
  answers,
  question,
  checkAnswer,
  userAnswer,
}) => {
  const theme = useTheme();
  return (
    <div>
      <Box m={2}>
        <Typography
          variant="h4"
          dangerouslySetInnerHTML={{ __html: question }}
        ></Typography>
      </Box>

      {answers.map((answer) => {
        let userClicked = userAnswer?.answer === answer;
        let isCorrect = userAnswer?.correct_answer === answer;
        return (
          <Button
            key={answer}
            onClick={checkAnswer}
            value={answer}
            disabled={userAnswer?.question === question}
            style={{
              background:
                userClicked && isCorrect
                  ? `${theme.palette.success.light}`
                  : userClicked && !isCorrect
                  ? `${theme.palette.error.light}`
                  : !userClicked && isCorrect
                  ? `${theme.palette.success.light}`
                  : undefined,
              border: 0,
              borderRadius: 3,
              boxShadow:
                userClicked && isCorrect
                  ? `${theme.customShadows.success}`
                  : userClicked && !isCorrect
                  ? `${theme.customShadows.error}`
                  : !userClicked && isCorrect
                  ? `${theme.customShadows.success}`
                  : `${theme.customShadows.default}`,
              color: theme.palette.common.black,
              height: 48,
              padding: "0 30px",
              margin: 8,
              fontSize: `${theme.typography.h5}`,
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </Button>
        );
      })}
    </div>
  );
};
