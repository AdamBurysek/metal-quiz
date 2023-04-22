import React from "react";
import { Link } from "react-router-dom";
import { translatePage } from "../utils/quizFunctions";

const ResultsPage = (props) => {
  return (
    <div
      className="section section_end"
      style={{ transform: translatePage(props.questionArray.length) }}
    >
      <div className="main-page_header">
        <div className="end_results-container">
          <h1 className="quiz_end">Výsledek</h1>
          <h3 className="quiz_results right_answers">Správných odpovědí:</h3>
          <h3 className="quiz_results right_answers">{props.rightAnswers}</h3>
          <h3 className="quiz_results wrong_answers">Špatných odpovědí:</h3>
          <h3 className="quiz_results wrong_answers">{props.badAnswers}</h3>
        </div>
        <Link style={{ height: "0" }} to={"/"}>
          <button className="btn_exit">Exit</button>
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;
