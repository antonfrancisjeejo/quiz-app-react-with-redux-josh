import axios from "axios";

//fetch quiz data from the api
export const getData = async () => {
  try {
    const { data } = await axios.get("https://opentdb.com/api.php?amount=15");
    return data.results;
  } catch (error) {
    return error;
  }
};
