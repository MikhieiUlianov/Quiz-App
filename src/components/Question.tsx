import QuizTimer from "./QuizTimer";
import Answers from "./Answers";
import { useState } from "react";
import QUESTIONS from "../questions.js";

type AnswerState = {
  selectedAnswer: string;
  isCorrect: boolean | null;
};

type QuestionProps = {
  index: number;
  onSelectAnswer: (selectedAnswer: string | null) => void;
  onSkipAnswer: () => void;
};

export default function Question({
  index,
  onSelectAnswer,
  onSkipAnswer,
}: QuestionProps) {
  const [answer, setAnswer] = useState<AnswerState>({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer: string) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuizTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
