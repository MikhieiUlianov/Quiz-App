import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question.js";

export default function Quiz() {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState<Array<string | null>>([]);

  const activeQuetionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuetionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer: string | null) {
      setAnswerState("answered");
      setUserAnswers((prevState) => {
        return [...prevState, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuetionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuetionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <Question
          key={activeQuetionIndex}
          questionText={QUESTIONS[activeQuetionIndex].text}
          answers={QUESTIONS[activeQuetionIndex].answers}
          answerState={answerState}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
      </div>
    </div>
  );
}
