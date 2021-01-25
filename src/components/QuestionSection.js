import React, { useState, useRef } from "react";
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
  const refContainer = useRef(null);

  const handleNext = () => {
    if (refContainer.current.value === correct_answer) {
      setScore(score + 1);
    }
    if (refContainer.current.value) {
      setIndexNumber(indexNumber + 1);
      setResultNumber(resultNumber + 1);
    } else {
      alert("Choose answer!");
    }
    if (resultNumber > 9) {
      setShowQuiz(false);
      setIndexNumber(0);
    }
    console.log(refContainer.current.value);
  };

  const handleRestart = () => {
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
                const randomKey = Math.random().toString(36).substring(7);
                return (
                  <div key={randomKey}>
                    <input type="radio" id={answer} name="answer" />
                    <label htmlFor={answer}>
                      <span
                        ref={refContainer}
                        onClick={() => (refContainer.current.value = answer)}
                        className="answer"
                        dangerouslySetInnerHTML={{
                          __html: answer,
                        }}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="buttons">
              <button className="next" onClick={handleNext}>
                {resultNumber < 10 ? "Next" : "Finish"}
              </button>
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
