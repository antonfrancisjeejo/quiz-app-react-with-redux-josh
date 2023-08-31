//calculates the total final score

const calculateTotal = (answers) => {
  let total = 0;
  answers.forEach((answer) => {
    total += answer.correct_answer === answer.selectedOption ? 1 : 0;
  });
  return total;
};

export default calculateTotal;
