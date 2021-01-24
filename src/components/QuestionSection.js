import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Results from "./Results";

const QuestionSection = ({ results }) => {
  const [showQuiz, setShowQuiz] = useState(true);

  const history = useHistory();
  const [indexNumber, setIndexNumber] = useState(0);
  const { question, correct_answer, incorrect_answers } = results[indexNumber];
  const [resultNumber, setResultNumber] = useState(1);

  const answers = [correct_answer, ...incorrect_answers];
  const randomAnswers = answers.sort(() => Math.random() - 0.5);

  const [score, setScore] = useState(0);
  let selectedAnswer = "";

  const handleNext = () => {
    if (selectedAnswer === correct_answer) {
      setScore(score + 1);
    }
    if (selectedAnswer.length > 0) {
      setIndexNumber(indexNumber + 1);
      setResultNumber(resultNumber + 1);
      selectedAnswer = "";
    } else {
      alert("Choose answer!");
    }
  };

  const handleFinish = () => {
    setShowQuiz(false);
  };

  const handleRestart = () => {
    selectedAnswer = "";
    setScore(0);
    history.push("/");
  };

  return (
    <>
      {showQuiz ? (
        <>
          <div className="quiz-section">
            <div className="question-number">
              <p>Question: {resultNumber}/10</p>
            </div>
            <div className="question">
              <h2 dangerouslySetInnerHTML={{ __html: question }} />
            </div>
            <div className="answers">
              {randomAnswers.map((answer) => {
                let randomKey = Math.random().toString(36).substring(7);
                return (
                  <div key={randomKey}>
                    <input type="radio" id={answer} name="answer" />
                    <label htmlFor={answer}>
                      <span
                        className="answer"
                        dangerouslySetInnerHTML={{
                          __html: answer,
                        }}
                        onClick={() => (selectedAnswer = answer)}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="buttons">
              {indexNumber < 9 && (
                <button className="next" onClick={handleNext}>
                  Next
                </button>
              )}
              {indexNumber >= 9 && (
                <button className="next" onClick={handleFinish}>
                  Finish
                </button>
              )}
              <button className="restart" onClick={handleRestart}>
                Restart
              </button>
            </div>
          </div>
        </>
      ) : (
        <Results score={score} handleRestart={handleRestart} />
      )}
    </>
  );
};

export default QuestionSection;
