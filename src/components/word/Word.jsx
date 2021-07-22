import React from "react";
import "./Word.style.scss";

const Word = ({ selectedWord, correctLetters }) => {
  return (
    <div className="word">
      {selectedWord.split("").map((letter, idx) => (
        <span className="letter" key={idx}>
          {correctLetters.includes(letter) ? letter : ""}
        </span>
      ))}
    </div>
  );
};

export default Word;
