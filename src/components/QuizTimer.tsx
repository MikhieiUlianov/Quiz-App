import { useEffect, useState } from "react";

type QuizTimerProps = {
  timeout: number;
  nextQuestion: () => void;
};

export default function QuizTimer({ timeout, nextQuestion }: QuizTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      nextQuestion();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [nextQuestion]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress id="question-time" max={timeout} value={remainingTime}></progress>
  );
}
