import React, { useState } from 'react';
import '../steelsheets/GameInfo.css';

function GameInfo({ propNewScore }){
  
    return(
      <div className='score'>
        <p id='fijo'>SCORE</p> 
        <p id='variable'>{propNewScore}</p>
      </div>
    );
  
  }
  
  export default GameInfo;