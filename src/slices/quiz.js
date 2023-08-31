import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: [],
  questions: [],
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswersData: (state, action) => {
      state.answers = action.payload;
    },
    setAnswer: (state, action) => {
      state.answers = state.answers.map((answer) => {
        if (answer.id === action.payload.id) {
          return {
            ...answer,
            ...action.payload.data,
          };
        }
        return answer;
      });
    },
    clearAnswers: (state) => {
      state.answers = [];
    },
    setQuestionsData: (state, action) => {
      state.questions = action.payload;
    },
    clearQuestionsData: (state) => {
      state.questions = [];
    },
  },
});

export const {
  setAnswersData,
  setAnswer,
  setQuestionsData,
  clearQuestionsData,
  clearAnswers,
} = quizSlice.actions;

export const getAnswers = (state) => state.quizInfo.answers;
export const getQuestions = (state) => state.quizInfo.questions;

export default quizSlice.reducer;
