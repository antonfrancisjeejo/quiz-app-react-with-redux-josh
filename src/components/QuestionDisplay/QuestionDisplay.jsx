import React, { useMemo } from "react";
import styles from "./QuestionDisplay.module.css";
import shuffle from "lodash.shuffle";
import { Option } from "components";

const QuestionDisplay = ({
  selectedQuestion,
  questionNo,
  nextQuestion,
  selected,
  setSelected,
  lastQuestion,
  submitTest,
  progress,
}) => {
  let shuffledOptions = [];

  //shuffles the given set of options for each question
  shuffledOptions = useMemo(() => {
    if (selectedQuestion?.options) {
      return shuffle(Object?.keys(selectedQuestion?.options));
    }
    return [];
  }, [questionNo, selectedQuestion]);

  //selects the question data with the user's perviously selected answer to preload it
  //if they have already answered it
  let question = useMemo(() => {
    return progress.find((data) => data.id == selectedQuestion.id);
  }, [selectedQuestion.id]);

  return (
    <div className={styles.container}>
      <div className={styles.questionDisplay}>
        <h2>
          {questionNo + 1}. {selectedQuestion.question}
        </h2>
      </div>
      <>
        <div className={styles.typeOne}>
          <div className={styles.optionsContainer}>
            {shuffledOptions.map((option, index) => {
              return (
                <Option
                  key={index}
                  optionValue={selectedQuestion.options[option]}
                  option={selectedQuestion.options[option]}
                  selected={selected}
                  setSelected={setSelected}
                  selectedOpt={question?.selectedOption}
                  questionId={question?.questionNo}
                />
              );
            })}
          </div>
        </div>
        {lastQuestion ? (
          <div className={styles.buttonContainer}>
            <button onClick={submitTest}>Submit Test</button>
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            <button onClick={nextQuestion}>Next Question</button>
          </div>
        )}
      </>
    </div>
  );
};

export default QuestionDisplay;
