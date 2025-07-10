import QuizTimer from "./QuizTimer";
import Answers from "./Answers";

type QuestionProps = {
  questionText: string;
  answers: string[];
  onSelectAnswer: (selectedAnswer: string | null) => void;
  answerState: string;
  selectedAnswer: string | null;
  onSkipAnswer: () => void;
};

export default function Question({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
}: QuestionProps) {
  return (
    <div id="question">
      <QuizTimer timeout={10000} handleSkipAnswer={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
}
