import React, { useState } from 'react';
import DiceFace from './components/DiceFace';
import './App.css';

function App() {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [dice3, setDice3] = useState(1);

  const [rolls, setRolls] = useState(0);
  const [isRolling, setIsRolling] = useState(0);
  const [doubleCount, setDoubleCount] = useState(0);
  const [tripleCount, setTripleCount] = useState(0);

  const rollDice = () => {
  const audio = new Audio('/sounds/roll.mp3');
  audio.play();

  setIsRolling(true);

  setTimeout(() => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const d3 = Math.floor(Math.random() * 6) + 1;

    setDice1(d1);
    setDice2(d2);
    setDice3(d3);

    const isTriple = d1 === d2 && d2 === d3;
    const isDouble = !isTriple && (d1 === d2 || d1 === d3 || d2 === d3);

    if (isTriple) setTripleCount(prev => prev + 1);
    else if (isDouble) setDoubleCount(prev => prev + 1);

    setRolls(prev => prev + 1);
    setIsRolling(false);
  }, 300);
};

  const isTriple = dice1 === dice2 && dice2 === dice3;
  const isDouble =
    !isTriple &&
    (dice1 === dice2 || dice1 === dice3 || dice2 === dice3);

  return (
    <div className="App">
      <h1>🎲 Roll the Dice</h1>
      <div className="dice-container">
        <DiceFace value={dice1} isRolling={isRolling} />
        <DiceFace value={dice2} isRolling={isRolling} />
        <DiceFace value={dice3} isRolling={isRolling} />
      </div>
      <button onClick={rollDice}>Roll</button>

      {isTriple ? (
        <p className="win-text">You rolled a Triple! 🎉</p>
      ) : isDouble ? (
        <p className="win-text">You rolled a Double! 🎉</p>
      ) : (
        <p className="win-text">Try again!! 😅</p>
      )}

      <div className="scoreboard">
        <p>Total rolls: {rolls}</p>
        <p>Doubles: {doubleCount}</p>
        <p>Triples: {tripleCount}</p>
      </div>
    </div>
  );
}

export default App;
