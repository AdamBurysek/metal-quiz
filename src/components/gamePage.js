import React, { useState, useEffect } from "react";
import hlinik from "../img/hlinik.jpg";

const GamePage = () => {
  let [finalArray, setFinalArray] = useState([]);
  let [count, setCount] = useState(0);
  let [showResult, setShowResult] = useState(true);
  let [clicked, setClicked] = useState("Hliník");

  const kovy = ["Hliník", "Měď", "Nikl", "Olovo", "Titan", "Železo"];

  function shuffleQuestions(array, questionAnswer) {
    let answerInTopFour = false;
    while (!answerInTopFour) {
      for (let i = 0; i < array.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      let topFour = array.slice(0, 4);

      for (let i = 0; i < topFour.length; i++) {
        if (topFour[i] == questionAnswer) {
          answerInTopFour = true;
        }
      }
    }
    return array.slice(0, 4);
  }

  function setQuestions() {
    let answer;
    let kovyCopy;
    for (let i = 0; i < kovy.length; i++) {
      kovyCopy = [...kovy];
      answer = [kovyCopy[i]];
      let shuffle = shuffleQuestions(kovyCopy, answer);
      finalArray.push({
        answer: answer.toString(),
        questions: shuffle,
        image: answer
          .toString()
          .toLowerCase()
          .replace(/[ž]/g, "z")
          .replace(/[š]/g, "s")
          .replace(/[ě]/g, "e")
          .replace(/[ď]/g, "d")
          .replace(/[í]/g, "i"),
        key: (i + 1) * new Date(),
        id: i,
      });
    }
  }

  setQuestions();

  function getImageUrl(array) {
    return require("../img/" + array.image + ".jpg");
  }

  function translatePage(id) {
    return "translateX(" + id * 100 + "%)";
  }

  function slidesWidth(array) {
    return array.length * 100 + "%";
  }

  function slidePage(num) {
    return num * 100 + "%";
  }

  const onSubmit = (btn, pageId) => {
    setClicked(btn);
    if (btn === pageId.answer) console.log("heureka");
    if (btn !== pageId.answer) console.log("smolik");
    setTimeout(pageSwitch, 1500);
  };

  const pageSwitch = () => {
    count--;
    if (count * -1 > kovy.length - 1) {
      count = 0;
    }
    setCount(count);
  };

  return (
    <div>
      <div className="screen_crop">
        <div
          className="slide"
          style={{ width: slidesWidth(finalArray), left: slidePage(count) }}
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
          ;
        </div>
      </div>
    </div>
  );
};

export default GamePage;
