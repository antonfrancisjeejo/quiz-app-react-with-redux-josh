import React, { useRef } from "react";
import styles from "./Home.module.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "slices/user";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const userRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startQuiz = (e) => {
    e.preventDefault();
    const email = userRef.current.value.trim();
    //validation is done
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    const mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(mailformat)) {
      toast.warn("Please enter a valid email address");
      return;
    }
    dispatch(setUser(email));
    localStorage.setItem("user", email);
    navigate("/quiz");
  };

  return (
    <div className={styles.home}>
      <form className={styles.container}>
        <div className={styles.home__title}>Quiz App</div>
        <input type="email" ref={userRef} placeholder="Enter your email" />
        <br />
        <button type="submit" onClick={startQuiz}>
          Let's Start
        </button>
      </form>
    </div>
  );
};

export default Home;
