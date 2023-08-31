import React, { useEffect } from "react";
import styles from "./Option.module.css";

const Option = ({
  option,
  optionValue,
  selected,
  setSelected,
  selectedOpt,
  questionId,
}) => {
  //for getting rid of server and client mismatch issue

  useEffect(() => {
    if (selectedOpt) {
      setSelected(selectedOpt);
    }
  }, [questionId, selectedOpt]);

  return (
    <div
      className={`${styles.optionContainer} ${
        selected === option ? styles.selectedOption : ""
      }`}
      onClick={() => setSelected(option)}
    >
      <input
        name="option"
        type="radio"
        value={option}
        className={styles.option}
        checked={selected === option}
        onChange={(e) => {}}
      />
      <pre>{optionValue}</pre>
    </div>
  );
};

export default Option;
