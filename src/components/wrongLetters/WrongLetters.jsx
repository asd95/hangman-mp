import React from "react";
import "./WrongLetters.style.scss";

const WrongLetters = ({ wrongLetters }) => {
  return (
    // компонент отображающий ошибочный ввод букв
    <div className="wrong-letters">
      <div className="letter">
        {wrongLetters.length > 0 && <p>Wrong</p>}
        {
          wrongLetters.map((letter, idx) => (
            <span key={idx}> {letter} </span>
          ))
        }
      </div>
    </div>
  );
};

export default WrongLetters;
