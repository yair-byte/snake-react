import React, { useState } from 'react';
import '../steelsheets/GameStarted.css';

const GameStartedComponent = ({ onStartGame }) => {

  const [snakeSpeed, setSnakeSpeed] = useState(2);

  const handleSpeedChange = (e) => {
    setSnakeSpeed(parseInt(e.target.value));
  };

  return (
    <div className='welcome-container'>
      <h1>SNAKE GAME</h1>
      <div className='speed-options'>
        <label>
          <input type='radio' name='speed' value='1' checked={snakeSpeed === 1} onChange={handleSpeedChange} />
          Slow
        </label>
        <label>
          <input type='radio' name='speed' value='2' checked={snakeSpeed === 2} onChange={handleSpeedChange} />
          Normal
        </label>
        <label>
          <input type='radio' name='speed' value='3' checked={snakeSpeed === 3} onChange={handleSpeedChange} />
          Fast
        </label>
        <label>
          <input type='radio' name='speed' value='4' checked={snakeSpeed === 4} onChange={handleSpeedChange} />
          Very Fast
        </label>
        <label>
          <input type='radio' name='speed' value='5' checked={snakeSpeed === 5} onChange={handleSpeedChange} />
          Extreme
        </label>
      </div>
      <button onClick={() => onStartGame(snakeSpeed)}>GO!!</button>

    </div>
  );
};

export default GameStartedComponent;
