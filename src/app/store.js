import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizReducer from "../slices/quiz";
import userReducer from "../slices/user";

const reducer = combineReducers({
  userInfo: userReducer,
  quizInfo: quizReducer,
});

export const store = configureStore({
  reducer,
});
