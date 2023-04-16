import React from "react";

const ResultsPage = () => {
  return (
    <div class="section section_end">
      <div class="main-page_header">
        <h1 class="quiz_end">Výsledek</h1>
        <h3 class="quiz_results right_answers">Správných odpovědí:</h3>
        <h3 class="quiz_results wrong_answers">Špatných odpovědí:</h3>
        <button class="btn_exit">Exit</button>
      </div>
      <div class="end_results-container"></div>
    </div>
  );
};

export default ResultsPage;
