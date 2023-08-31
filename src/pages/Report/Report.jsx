import { calculateTotal } from "helpers";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAnswers, clearQuestionsData, getAnswers } from "slices/quiz";
import styles from "./Report.module.css";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const answers = useSelector(getAnswers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (answers.length === 0) {
      navigate("/");
    }
  }, []);

  //calculates the total score
  const total = useMemo(() => {
    return calculateTotal(answers);
  }, []);

  const startNew = () => {
    dispatch(clearQuestionsData());
    dispatch(clearAnswers());
    localStorage.clear("user");
    navigate("/");
  };

  const tryAgain = () => {
    dispatch(clearAnswers());
    navigate("/quiz");
  };

  return (
    <div className={styles.report}>
      <div className={styles.container}>
        <div>
          <div className={styles.report__score}>
            You scored {total} out of {answers.length}
          </div>
          <div className={styles.report__buttonContainer}>
            <button className={styles.report__try} onClick={tryAgain}>
              Try Again
            </button>
            <button className={styles.report__new} onClick={startNew}>
              Start New
            </button>
          </div>
        </div>
        <div className={styles.report__tableContainer}>
          <table className={styles.report__table}>
            <thead>
              <tr>
                <th>Question</th>
                <th>Your Answer</th>
                <th>Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer) => (
                <tr key={answer.id}>
                  <td>{answer.question}</td>
                  <td
                    className={
                      answer.selectedOption === answer.correct_answer
                        ? styles.report__correctAnswer
                        : styles.report__wrongAnswer
                    }
                  >
                    {answer.selectedOption ? answer.selectedOption : "-"}
                  </td>
                  <td>{answer.correct_answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
