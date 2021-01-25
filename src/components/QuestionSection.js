import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Results from "./Results";

const QuestionSection = ({ results }) => {
  const [showQuiz, setShowQuiz] = useState(true);

  const history = useHistory();
  const [indexNumber, setIndexNumber] = useState(0);
  const [resultNumber, setResultNumber] = useState(1);
  const [disabledButton, setDisabledButton] = useState("disabled");
  const { question, correct_answer, incorrect_answers } = results[indexNumber];

  const answers = [correct_answer, ...incorrect_answers];
  const [randomAnswers, setRandomAnswers] = useState([]);

  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    setRandomAnswers(answers.sort(() => Math.random() - 0.5));
  }, [indexNumber]);

  const handleNext = () => {
    if (selectedAnswer === correct_answer) {
      setScore(score + 1);
    }
    if (selectedAnswer.length > 0) {
      setIndexNumber(indexNumber + 1);
      setResultNumber(resultNumber + 1);
    }
    if (resultNumber > 9) {
      setShowQuiz(false);
      setIndexNumber(0);
    }
    setDisabledButton("disabled");
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
              {randomAnswers.map((answer, i) => {
                return (
                  <div key={resultNumber + answer}>
                    <input type="radio" id={answer} name="answer" />
                    <label htmlFor={answer}>
                      <span
                        onClick={() => {
                          setSelectedAnswer(answer);
                          setDisabledButton("");
                        }}
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
              <button
                className="next"
                disabled={disabledButton}
                onClick={handleNext}
              >
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
