import { useEffect, useState } from "react";

type QuizTimerProps = {
  timeout: number;
  handleSkipAnswer: () => void;
};

export default function QuizTimer({
  timeout,
  handleSkipAnswer,
}: QuizTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSkipAnswer();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [handleSkipAnswer]);

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
