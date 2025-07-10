import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuizTimer from "./QuizTimer.js";

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

  const onNextQuestion = useCallback(
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

  const shuffledAnswers = [...QUESTIONS[activeQuetionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuizTimer
          key={activeQuetionIndex}
          timeout={10000}
          nextQuestion={onNextQuestion}
        />
        <h2>{QUESTIONS[activeQuetionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer: string) => {
            return (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
