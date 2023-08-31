import React, { useEffect, useMemo, useState } from "react";
import styles from "./QuizHeader.module.css";
import { timer as countdown } from "helpers";
import { AiFillClockCircle } from "react-icons/ai";

//3600 = 1 hour

const QuizHeader = ({ duration, submitTest }) => {
  const [timer, setTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  let time = useMemo(() => {
    return duration;
  }, [duration]);

  //runs the timer
  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      --time;
      if (time === 0) {
        clearInterval(interval);
        submitTest();
      }
      setTimer(countdown(time));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.testHeader}>
        <h1>Quiz App</h1>
        <div
          className={styles.timer}
          style={
            Number(timer.hours) > 0
              ? {
                  background: "#e6eafc",
                  width: 195,
                }
              : Number(timer.minutes) >= 5
              ? {
                  background: "#e6eafc",
                  width: 160,
                }
              : {
                  background: "#F5CED3",
                  width: 160,
                }
          }
        >
          {Number(timer.minutes) >= 5 ? (
            <AiFillClockCircle color="blue" />
          ) : (
            <AiFillClockCircle color="red" />
          )}
          <span>
            {Number(timer.hours) > 0
              ? `${timer.hours}h : ${timer.minutes}m : ${timer.seconds}s Left`
              : `${timer.minutes}m : ${timer.seconds}s Left`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
