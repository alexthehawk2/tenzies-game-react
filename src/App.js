import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Dice from "./components/Dice";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "./style.css";

function App() {
  const { height, width } = useWindowSize();
  function generateDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      const diceObj = {
        value: randomNum,
        isHeld: false,
        id: nanoid(),
      };
      diceArray.push(diceObj);
    }
    return diceArray;
  }

  const [dice, setDice] = useState(generateDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  useEffect(() => {
    if (tenzies) {
      console.log("we won");
    }
    const checkArr = [];
    dice.forEach((die) => {
      checkArr.push({ value: die.value, isHeld: die.isHeld });
    });
    const checkResult = areObjectsSame(checkArr);
    if (checkResult) {
      setTenzies(true);
    }
  }, [dice, tenzies]);
  function areObjectsSame(array) {
    return array.every((object) => {
      // Check if all keys and values in the object are the same
      return Object.keys(object).every((key) => object[key] === array[0][key]);
    });
  }

  function rollDice() {
    if (tenzies) {
      setDice(generateDice);
      setTenzies(false);
      setRollCount(0);
    }
    setRollCount((oldCount) => oldCount + 1);
    setDice((oldDice) =>
      oldDice.map((dice) => {
        return dice.isHeld
          ? dice
          : { ...dice, value: Math.floor(Math.random() * 6) + 1 };
      })
    );
  }
  function holdDice(id) {
    setDice((oldDice) => {
      return oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      });
    });
  }
  return (
    <main className="App">
      {tenzies && <Confetti width={width} height={height} />}
      <h2 className="title">Tenzies Game</h2>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <h2 className="roll-count">Number of Rolls : {rollCount}</h2>
      <div className="dice-container">
        {dice.map((dice) => {
          return (
            <Dice
              id={dice.id}
              holdDice={holdDice}
              isHeld={dice.isHeld}
              key={dice.id}
              value={dice.value}
            />
          );
        })}
      </div>
      <div className="roll-btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </div>
    </main>
  );
}

export default App;
