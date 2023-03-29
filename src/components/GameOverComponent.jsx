import React from 'react';
import '../steelsheets/GameOver.css';

function GameOverComponent({ propFinalScore , propRestartGame }){
  
  return(
    <div className='game-over'>
      <h1>
       ¡Game Over!
      </h1>
      <p>
        Final Score: {propFinalScore}
      </p>
      <button onClick={propRestartGame}>
        Restart Game
      </button>
    </div>
  );
  }
  
export default GameOverComponent;