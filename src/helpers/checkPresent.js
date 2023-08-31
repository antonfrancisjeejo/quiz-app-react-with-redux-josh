const checkPresent = (arr, selected) => {
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element.questionNo === selected.questionNo) {
      return true;
    }
  }
  return false;
};

export default checkPresent;
