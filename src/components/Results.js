import React from "react";
import Loser from "../assets/youknownothing.gif";
import Winner from "../assets/iknowsomething.gif";

const Results = ({ score, handleRestart }) => {
  return (
    <>
      <div className="results">
        <h1>Your Score: {score}/10</h1>
        {score <= 5 && <img src={Loser} alt="Loser" />}
        {score > 5 && <img src={Winner} alt="Winner" />}
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
