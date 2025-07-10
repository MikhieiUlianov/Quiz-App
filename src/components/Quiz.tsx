import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.js";
import Summary from "./Summary.js";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState<Array<string | null>>([]);

  const activeQuetionIndex = userAnswers.length;
  const quizIsComplete = activeQuetionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer: string | null
  ) {
    setUserAnswers((prevState) => {
      return [...prevState, selectedAnswer];
    });
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <div id="question">
        <Question
          key={activeQuetionIndex}
          index={activeQuetionIndex}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
      </div>
    </div>
  );
}
