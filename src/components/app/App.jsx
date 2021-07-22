import React, { Component } from "react";
import Header from "../header/Header.jsx";
import GameContainer from "../gameContainer/GameContainer.jsx";
import Figure from "../figure/Figure.jsx";
import WrongLetters from "../wrongLetters/WrongLetters.jsx";
import Word from "../word/Word.jsx";
import Popup from "../Popup/Popup.jsx";
import Notification from "../Notification/Notification.jsx";

import "./App.style.scss";

class App extends Component {
  // Определяем контекст для функций.
  onSelectLetter = this.onSelectLetter.bind(this);
  playAgain = this.playAgain.bind(this);

  // Инициализация стэйта.
  state = {
    res: {
      playable: true,
      message: null,
    },
    notification: false,
    words: [
      "application",
      "programming",
      "interface",
      "wizard",
      "developer",
      "",
    ],
    selectedWord: "",
    correctLetters: [],
    wrongLetters: [],
  };
// Выбираем рандомное слово, перезаписываем его в стэйте и добавляем событие keydown к window.
  componentDidMount() {
    this.setState(({ words }) => {
      const selectedWord = words[Math.floor(Math.random() * words.length)];
      return {
        selectedWord,
      };
    });
    window.addEventListener("keydown", this.onSelectLetter);
  }


  componentWillUnmount() {
    window.removeEventListener("keydown", this.onSelectLetter);
  }

  // функция для уведомлении об ошибке повторного нажатия на одну и ту же букву
  showNotification() {
    this.setState({ notification: true });

    setTimeout(() => {
      this.setState({ notification: false });
    }, 2000);
  }

// Функция для начала новой игры. Мы переопределяем данные по дефолту.
  playAgain() {
    this.setState(({words}) => {
      const newWord = words[Math.floor(Math.random() * words.length)];
      return {
        res: {
          playable: true,
          message: null,
        },
        selectedWord: newWord,
        correctLetters: [],
        wrongLetters: [],
      };
    });
  }

  onSelectLetter(event) {
    const {
      res: { playable },
      correctLetters,
      wrongLetters,
      selectedWord,
    } = this.state;
    const { key, keyCode } = event;

    // определяем какие изменения будут происходить с состоянием наших данных при нажатии на рзные буквы
    if (playable && keyCode >= 65 && keyCode <= 90) {
      const letter = key.toLowerCase();
      // если нажали букву содержащаяся в слове
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          this.setState(({ correctLetters }) => {
            const newArrayCorrectLatters = [...correctLetters, letter];
            // изменяем данные в стэйте в зависимости от условий
            // рефакторинг/ сделать одну функцию под это действие
            if (
              selectedWord
                .split("")
                .every((letters) => newArrayCorrectLatters.includes(letters))
            ) {
              return {
                res: {
                  playable: false,
                  message: "win",
                },
                correctLetters: newArrayCorrectLatters,
              };
            }
            return {
              correctLetters: newArrayCorrectLatters,
            };
          });
        } else {
          this.showNotification();
        }
      } else {
        // если нажали букву не содержащаяся в слове
        if (!wrongLetters.includes(letter)) {
          this.setState(({ wrongLetters }) => {
            const newArrayWrongLatters = [...wrongLetters, letter];
            if (newArrayWrongLatters.length === 6) {
              return {
                res: {
                  playable: false,
                  message: "lose",
                },
                wrongLetters: newArrayWrongLatters,
              };
            }
            return {
              wrongLetters: newArrayWrongLatters,
            };
          });
        } else {
          this.showNotification();
        }
      }
    }
  }

  render() {
    const {
      res,
      correctLetters,
      wrongLetters,
      selectedWord,
      notification,
    } = this.state;
    return (
      <div className="app">
        <Header />
        <GameContainer>
          <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </GameContainer>
        <Notification showNotification={notification} />
        <Popup
          res={res}
          selectedWord={selectedWord}
          playAgain={this.playAgain}
        />
      </div>
    );
  }
}

export default App;
