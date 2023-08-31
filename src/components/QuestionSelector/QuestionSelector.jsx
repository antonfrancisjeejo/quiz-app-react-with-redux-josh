import React from "react";
import styles from "./QuestionSelector.module.css";

const QuestionSelector = ({
  questions,
  selectQuestion,
  questionNo,
  progress,
  submitTest,
}) => {
  return (
    <div className={styles.container}>
      <article className={styles.questionSelector}>
        <div className={styles.questionContainer}>
          <div className={styles.questions}>
            {questions.map((question, index) => {
              let progressQuestion = progress.find((q) => q.id == question?.id);

              return (
                <div
                  key={index}
                  className={`${styles.question} ${
                    questionNo === index
                      ? styles.question__selected
                      : progressQuestion?.status === 2
                      ? styles.question__attended
                      : progressQuestion?.status === 3
                      ? styles.question__skipped
                      : ""
                  }`}
                  onClick={() => selectQuestion(question.id)}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
          <div className={styles.meanings}>
            <div className={styles.attended}>
              <div></div>
              <p>Attended</p>
            </div>
            <div className={styles.skipped}>
              <div></div>
              <p>Skipped</p>
            </div>
            <div className={styles.toAttend}>
              <div></div>
              <p>Yet to Attend</p>
            </div>
          </div>
        </div>
        <button onClick={submitTest}>Submit Test</button>
      </article>
    </div>
  );
};

export default QuestionSelector;
