import {useEffect, useState, useRef, useCallback} from 'react';

import numeral from 'numeral';

export function useTimer(
  milisecondstart = 0,
  milisecondend = 0,
  secondsavailable = 0,
) {
  const [seconds, setSeconds] = useState(
    (milisecondend - milisecondstart) / 1000,
  );

  const timerInterval = useRef();

  useEffect(() => {
    timerInterval.current = setInterval(() => {
      const currentSeconds = (Date.now() - milisecondstart) / 1000;

      setSeconds(currentSeconds);
    }, 1000);

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [milisecondstart]);

  const stopTimer = useCallback(() => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }
  }, []);

  const startTimer = useCallback(() => {
    if (!timerInterval.current) {
      timerInterval.current = setInterval(() => {
        const currentSeconds = (Date.now() - milisecondstart) / 1000;

        setSeconds(currentSeconds);
      }, 1000);
    }
  }, [milisecondstart]);

  const resetTimer = useCallback(() => {
    setSeconds(0);
  }, []);
  return {
    seconds,
    stopTimer,
    startTimer,
    resetTimer,
    timerStr: numeral(seconds).format('00:00:00'),
    countDownSeconds: secondsavailable > 0 && secondsavailable - seconds,
    countDownStr:
      secondsavailable > 0 &&
      numeral(secondsavailable - seconds).format('00:00:00'),
  };
}
