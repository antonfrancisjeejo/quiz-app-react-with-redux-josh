import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "services/data";
import ReactLoading from "react-loading";
import { QuestionDisplay, QuestionSelector, QuizHeader } from "components";
import styles from "./Quiz.module.css";
import {
  getAnswers,
  getQuestions,
  setAnswer,
  setAnswersData,
  setQuestionsData,
} from "slices/quiz";
import { useNavigate } from "react-router-dom";
import { setUser } from "slices/user";

const Quiz = () => {
  const answers = useSelector(getAnswers);
  const questionsData = useSelector(getQuestions);
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionNo, setQuestionNo] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(user));
    } else {
      navigate("/");
    }
  }, []);

  //initializes the required data for the application
  useEffect(() => {
    const quizData = async () => {
      try {
        const data = await getData();
        //configures the api data to a proper format to be used in the application
        const questionsData = data.map((question, index) => {
          return {
            id: index,
            ...question,
            options: [...question.incorrect_answers, question.correct_answer],
          };
        });
        setQuestions(questionsData);
        //storing the questionsdata in two states in the store, later one will be used to storing answers
        //another one is used to store questions data so if the user wishes to try the same set of questions again
        //it will be taken from the state
        dispatch(setAnswersData(questionsData));
        dispatch(setQuestionsData(questionsData));
        setSelectedQuestion({
          id: 0,
          ...data[0],
          options: [...data[0].incorrect_answers, data[0].correct_answer],
        });
      } catch (error) {
        // console.log(error);
      }
    };

    //if we have already fetched the data again it won't fetch it
    if (questionsData.length === 0) {
      quizData();
    } else {
      setQuestions(questionsData);
      dispatch(setAnswersData(questionsData));
      setSelectedQuestion({
        id: 0,
        ...questionsData[0],
        options: [
          ...questionsData[0].incorrect_answers,
          questionsData[0].correct_answer,
        ],
      });
    }
    return () => {
      setQuestions([]);
    };
  }, []);

  //submits the test
  const submitTest = () => {
    let answer = {
      selectedOption,
      status: selectedOption === "" ? 3 : 2,
    };
    dispatch(setAnswer({ id: selectedQuestion.id, data: answer }));
    navigate("/report");
  };

  //navigates to the next question
  const nextQuestion = async () => {
    let answer = {
      selectedOption,
      status: selectedOption === "" ? 3 : 2,
    };
    dispatch(setAnswer({ id: selectedQuestion.id, data: answer }));
    if (questions[questionNo + 1]) {
      setQuestionNo((curr) => curr + 1);
      setSelectedQuestion(questions[questionNo + 1]);
      setSelectedOption("");
      return;
    }
  };

  //navigates to a particular question
  const selectQuestion = async (Qno) => {
    let answer = {
      selectedOption,
      status: selectedOption === "" ? 3 : 2,
    };
    dispatch(setAnswer({ id: selectedQuestion.id, data: answer }));
    setSelectedQuestion(questions[Qno]);
    setQuestionNo(Qno);
    setSelectedOption("");
  };

  //displays a loader when the questions data get fetched from the api
  if (questions.length === 0 || !selectedQuestion) {
    return (
      <div className={styles.container}>
        <ReactLoading type={"spin"} color={"#4645F6"} />
      </div>
    );
  }

  return (
    <>
      <QuizHeader duration={1800} submitTest={submitTest} />
      <div className={styles.quiz}>
        <section className={styles.quiz__left}>
          <QuestionDisplay
            selectedQuestion={selectedQuestion}
            questionNo={questionNo}
            selected={selectedOption}
            setSelected={setSelectedOption}
            progress={answers}
            nextQuestion={nextQuestion}
            submitTest={submitTest}
            lastQuestion={questions[questionNo + 1] ? false : true}
          />
        </section>
        <section className={styles.quiz__right}>
          <QuestionSelector
            selectQuestion={selectQuestion}
            questionNo={questionNo}
            progress={answers}
            submitTest={submitTest}
            questions={questions}
          />
        </section>
      </div>
    </>
  );
};

export default Quiz;
