import { useRef } from "react";

type AnswersProps = {
  answers: string[];
  selectedAnswer: string | null;
  answerState: string;
  onSelect: (answer: string) => void;
};

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}: AnswersProps) {
  const shuffledAnswers = useRef<string[] | null>(null);

  if (shuffledAnswers.current === null) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current?.map((answer: string) => {
        const isSelected = selectedAnswer === answer;
        let cssClasses = "";

        if (answerState === "answered" && isSelected) {
          cssClasses = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClasses = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              disabled={answerState !== ""}
              className={cssClasses}
              onClick={() => onSelect(answer)}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
