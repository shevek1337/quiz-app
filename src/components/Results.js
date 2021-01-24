import React from "react";

const Results = ({ score, handleRestart }) => {
  return (
    <>
      <div className="results">
        <h2>Your Score: {score}/10</h2>
      </div>
      <div className="buttons">
        <button className="restart" onClick={handleRestart}>
          Restart
        </button>
      </div>
    </>
  );
};

export default Results;
