import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home, Quiz, Report } from "pages";
import { setUser } from "slices/user";
import { useDispatch } from "react-redux";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //in case if the user unknowingly refreshes the page, this makes them stay in the quiz page itself
  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      dispatch(setUser(user));
      navigate("/quiz");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  );
};

export default App;
