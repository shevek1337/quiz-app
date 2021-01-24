import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import QuestionSection from "./QuestionSection";
import axios from "axios";

const Quiz = () => {
  // parameters selected during start
  const location = useLocation();
  const categoryId = location.state.categoryId;
  const categoryName = location.state.categoryName;
  const difficulty = location.state.difficulty;

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}`
      )
      .then((res) => {
        setResults(res.data["results"]);
        setLoading(true);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div className="quiz">
          <div className="quiz-info">
            <h3>Difficulty: {difficulty || "Any"}</h3>
            <h2>Category: {categoryName}</h2>
            <h3>Good Luck and Have Fun!</h3>
          </div>
          <QuestionSection results={results} />
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Quiz;
