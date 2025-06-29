import React, { useState } from 'react';
import './App.css';
import DiceFace from './components/DiceFace';  // Corrected import path

const App = () => {
  const [dice, setDice] = useState([1, 1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [isTriple, setIsTriple] = useState(false);
  const [isDouble, setIsDouble] = useState(false);
  const [quote, setQuote] = useState('');
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);
  
  // New state variables to track rolls, doubles, and triples
  const [numRolls, setNumRolls] = useState(0);
  const [numDoubles, setNumDoubles] = useState(0);
  const [numTriples, setNumTriples] = useState(0);

  // Roll the dice function
  const rollDice = () => {
    setIsRolling(true);
    setIsTriple(false);
    setIsDouble(false);
    setQuote('');
    
    const newDice = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];

    setDice(newDice);

    const allSame = newDice[0] === newDice[1] && newDice[1] === newDice[2];
    const twoSame = newDice[0] === newDice[1] || newDice[1] === newDice[2] || newDice[0] === newDice[2];

    if (allSame) {
      setIsTriple(true);
      setIsDouble(false);
      setNumTriples(numTriples + 1);
    } else if (twoSame) {
      setIsDouble(true);
      setIsTriple(false);
      setNumDoubles(numDoubles + 1);
    } else {
      // Fetching a random quote if no win (double/triple)
      setIsLoadingQuote(true);
      fetch('https://quotes-db.vercel.app/api/random')
        .then(res => res.json())
        .then(data => {
          setQuote(`You didn’t win, but here’s a thought anyway.\n '“${data.quote}” — ${data.author}`);
        })
        .catch(err => {
          console.error('Quote fetch failed:', err);
          setQuote('You didn’t win, but here’s a thought anyway.');
        })
        .finally(() => setIsLoadingQuote(false));
    }

    // Increment the number of rolls
    setNumRolls(numRolls + 1);
    setIsRolling(false);
  };

  return (
    <div className="App">
      <h1>🎲 Roll the Dice Game</h1>
      <div className="dice-container">
        {dice.map((num, index) => (
          <DiceFace key={index} number={num} isRolling={isRolling} />
        ))}
      </div>
      <button onClick={rollDice} disabled={isRolling}>
        {isRolling ? 'Rolling...' : 'Roll the Dice'}
      </button>

      <div className="result-text">
        {isTriple ? (
          <p className="win-text">You rolled a Triple! 🎉</p>
        ) : isDouble ? (
          <p className="win-text">You rolled a Double! 🎉</p>
        ) : isLoadingQuote ? (
          <p className="joke-text">🌀 Finding you a quote...</p>
        ) : (
          <p className="joke-text">{quote || 'Rolling for wisdom...'}</p>
        )}
      </div>

      <div className="scoreboard">
        <p>Number of Rolls: {numRolls}</p>
        <p>Number of Doubles: {numDoubles}</p>
        <p>Number of Triples: {numTriples}</p>
      </div>
    </div>
  );
};

export default App;
