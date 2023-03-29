import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import GameOverComponent from './components/GameOverComponent';
import GameStartedComponent from './components/GameStartedComponent';

function App() {

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [snakeSpeed, setSnakeSpeed] = useState(1);

  const handleScore = () => {
    setScore(score + 1);
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  const handleRestartGame = () => {
    setGameOver(false);
    setScore(0);
    setShowWelcomeScreen(true);
  };

  const handleStartGame = (speed) => {
    setSnakeSpeed(speed);
    setShowWelcomeScreen(false); 
  };
  
  return (
    <div className='app'>
      <div className='game-container'>
        {showWelcomeScreen ? (
          <GameStartedComponent onStartGame={handleStartGame} />
        ) : !gameOver ? (
          <>
            <div className='information-container'>
              <GameInfo propNewScore={score} />
            </div>
            <Board propGameOver={handleGameOver} propSnakeSpeed={snakeSpeed} propScore={handleScore} />
          </>
        ) : (
          <GameOverComponent propFinalScore={score} propRestartGame={handleRestartGame} />
        )}
      </div>
    </div>
  );
}

export default App;
