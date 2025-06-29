import React from 'react';
import './DiceFace.css';

const DiceFace = ({ number, isRolling }) => {
  // Map dice numbers to CSS.GG dice icon classes
  const diceIcons = {
    1: 'gg-dice-1',
    2: 'gg-dice-2',
    3: 'gg-dice-3',
    4: 'gg-dice-4',
    5: 'gg-dice-5',
    6: 'gg-dice-6',
  };

  return (
    <div className={`dice ${isRolling ? 'rolling' : ''}`}>
      <i className={`gg ${diceIcons[number]}`} style={{ fontSize: '100px', color: '#444' }}></i>
    </div>
  );
};

export default DiceFace;
