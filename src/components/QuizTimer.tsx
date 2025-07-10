import { useEffect, useState } from "react";

type QuizTimerProps = {
  timeout: number;
  onTimeout: () => void;
};

export default function QuizTimer({ timeout, onTimeout }: QuizTimerProps) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout]);

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
