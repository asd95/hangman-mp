import React from "react";
import "./Popup.style.scss";

// 
const data = {
  win: {
    finalMessage: "Congratulations! You won!",
  },
  lose: {
    finalMessage: "Unfortunately you lost.",
    finalMessageRevealWord: `...the word was: `,
  },
};

const Popup = ({ res: { playable, message }, selectedWord, playAgain }) => {
  if (playable) {
    return null;
  }

  return (
    <div className="popup">
      <div className="container">
        <h2 className="final-message">{data[message].finalMessage}</h2>
        <h3 className="final-message-reveal-word">
          {data[message].finalMessageRevealWord
            ? `${data[message].finalMessageRevealWord} ${selectedWord}`
            : ""}
        </h3>
        <button className="play-button" onClick={playAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Popup;
