import React, { useState, useEffect } from "react";
import { shuffleQuestions, shuffleAnswers } from "../utils/randomizeQuiz";
import { Link } from "react-router-dom";
import {
  getImageUrl,
  translatePage,
  slidesWidth,
  slidePage,
} from "../utils/quizFunctions";

const GamePage = () => {
  let [finalArray, setFinalArray] = useState([]);
  let [count, setCount] = useState(0);
  let [showResult, setShowResult] = useState(false);
  let [clicked, setClicked] = useState("");
  let [rightAnswers, setRightAnswers] = useState(0);
  let [badAnswers, setBadAnswers] = useState(0);

  const questionArray = ["Hliník", "Měď", "Nikl", "Olovo", "Titan", "Železo"];

  function setQuestions() {
    let answer;
    let questionArrayCopy = [];
    let newArray = [];
    let shuffledQuestions = [];
    shuffledQuestions = shuffleQuestions(questionArray);
    for (let i = 0; i < questionArray.length; i++) {
      questionArrayCopy = [...shuffledQuestions];
      answer = [questionArrayCopy[i]];
      let shuffle = shuffleAnswers(questionArrayCopy, answer);
      newArray.push({
        answer: answer.toString(),
        questions: shuffle,
        image: answer
          .toString()
          .toLowerCase()
          .replace(/[ ]/g, "_")
          .replace(/[á]/g, "a")
          .replace(/[č]/g, "c")
          .replace(/[ď]/g, "d")
          .replace(/[é]/g, "e")
          .replace(/[ě]/g, "e")
          .replace(/[í]/g, "i")
          .replace(/[ň]/g, "n")
          .replace(/[ó]/g, "o")
          .replace(/[ř]/g, "r")
          .replace(/[š]/g, "s")
          .replace(/[ť]/g, "t")
          .replace(/[ú]/g, "u")
          .replace(/[ů]/g, "u")
          .replace(/[ý]/g, "y")
          .replace(/[ž]/g, "z"),
        key: (i + 1) * new Date(),
        id: i,
      });
    }
    setFinalArray(newArray);
  }

  useEffect(() => {
    setQuestions();
    // eslint-disable-next-line
  }, []);

  const onSubmit = (btn, pageId) => {
    setClicked(btn);
    if (btn === pageId.answer) {
      rightAnswers++;
      setRightAnswers(rightAnswers);
    }
    if (btn !== pageId.answer) {
      badAnswers++;
      setBadAnswers(badAnswers);
    }
    setShowResult(true);
    setTimeout(pageSwitch, 1500);
  };

  const pageSwitch = () => {
    count--;
    if (count * -1 > questionArray.length - 1) {
      count = questionArray.length * -1;
    }
    setShowResult(false);
    setCount(count);
  };

  return (
    <div>
      <div className="screen_crop">
        <div
          className="slide"
          style={{
            width: slidesWidth(questionArray.length + 1),
            left: slidePage(count),
          }}
        >
          {finalArray.map((page) => {
            return (
              <div
                className="section"
                key={page.key}
                style={{ transform: translatePage(page.id) }}
              >
                <div className="grid-container">
                  <div className="img_container">
                    <img
                      className="q_img"
                      src={getImageUrl(finalArray[page.id])}
                      alt=""
                    />
                  </div>
                  <div className="btn_container">
                    <ul>
                      {finalArray[page.id].questions.map((btn) => {
                        return (
                          <li key={btn}>
                            <button
                              disabled={showResult ? true : false}
                              key={btn}
                              onClick={() => onSubmit(btn, finalArray[page.id])}
                              className={
                                btn === finalArray[page.id].answer &&
                                showResult === true &&
                                btn === clicked
                                  ? "q_button btn_right"
                                  : "q_button " &&
                                    btn !== finalArray[page.id].answer &&
                                    showResult === true &&
                                    btn === clicked
                                  ? "q_button btn_wrong"
                                  : "q_button " &&
                                    showResult === true &&
                                    btn !== clicked
                                  ? "q_button btn_blur"
                                  : "q_button "
                              }
                            >
                              {btn}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
          ;{/* final page */}
          <div
            className="section section_end"
            style={{ transform: translatePage(questionArray.length) }}
          >
            <div className="main-page_header">
              <h1 className="quiz_end">Výsledek</h1>
              <h3 className="quiz_results right_answers">
                Správných odpovědí:
              </h3>
              <h3 className="quiz_results right_answers">{rightAnswers}</h3>
              <h3 className="quiz_results wrong_answers">Špatných odpovědí:</h3>
              <h3 className="quiz_results wrong_answers">{badAnswers}</h3>
              <Link style={{ height: "0" }} to={"/"}>
                <button className="btn_exit">Exit</button>
              </Link>
            </div>
            <div className="end_results-container"></div>
          </div>
          {/* final page */}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
