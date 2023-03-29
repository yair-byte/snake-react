import React, { useState , useEffect , useRef } from 'react';
import '../steelsheets/Board.css';

const BOARD_SIZE = 30;
const TYPE = {typeEmpty: 0, typeSnake: 1, typeFood: 2, typeSnakeHead: 3};
const DIRECTION = {UP: 0, DOWN: 1, RIGHT: 2, LEFT: 3};
const KEYS = {KEY_UP: 38, KEY_DOWN: 40, KEY_RIGHT: 39,KEY_LEFT: 37};

let snake = undefined;
let food = undefined;
let newDirection = undefined;
let snakeDirection = undefined;
let TICK_INTERVAL = undefined;

function Board({ propGameOver , propSnakeSpeed, propScore }){

  const createFirstBoard = () => {
    const firstBoard = new Array(BOARD_SIZE).fill(0).map(() => new Array(BOARD_SIZE).fill(TYPE.typeEmpty));
    snake = [{row: Math.floor(Math.random() * (BOARD_SIZE-10)) , column: Math.floor(Math.random() * (BOARD_SIZE-10))}];
    food = {row: Math.floor(Math.random() * BOARD_SIZE) , column: Math.floor(Math.random() * BOARD_SIZE)};
    newDirection = Math.floor(Math.random() * Object.keys(DIRECTION).length);
    snakeDirection = newDirection;
    TICK_INTERVAL = parseInt(300/propSnakeSpeed);
    snake.map((snakePixel) => {
      firstBoard[snakePixel.row][snakePixel.column] = TYPE.typeSnakeHead;
    })
    firstBoard[food.row][food.column] = TYPE.typeFood;
    return firstBoard;
  };

  const [board , setBoard] = useState(createFirstBoard);

  const isSnakeCell = (rowIndx,cellIndx) => {
    return (board[rowIndx][cellIndx] === TYPE.typeSnake);
  };

  const isSnakeHeadCell = (rowIndx,cellIndx) => {
    return (board[rowIndx][cellIndx] === TYPE.typeSnakeHead);
  };

  const isFoodCell = (rowIndx,cellIndx) => {
    return (board[rowIndx][cellIndx] === TYPE.typeFood);
  };

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case KEYS.KEY_UP:
        newDirection = DIRECTION.UP;
        break;
      case KEYS.KEY_DOWN:
        newDirection = DIRECTION.DOWN;
        break;
      case KEYS.KEY_LEFT:
        newDirection = DIRECTION.LEFT;
        break;
      case KEYS.KEY_RIGHT:
        newDirection = DIRECTION.RIGHT;
        break;
      default:
        newDirection = snakeDirection;
        break;
    }
  };

  const moveSnake = () => {
    let firstObj = snake[0];
    let newElement = {row: firstObj.row , column: firstObj.column};
    snake.unshift(newElement);
    switch (newDirection) {
      case DIRECTION.UP:
        if(snakeDirection === DIRECTION.DOWN) {
          snake[0].row += 1;
        }
        else if(snakeDirection === DIRECTION.UP) {
          snake[0].row -= 1;
        }
        else if (snakeDirection === DIRECTION.LEFT) {
          snake[0].row -= 1;
          snakeDirection = DIRECTION.UP;
        }
        else {
          snake[0].row -= 1;
          snakeDirection = DIRECTION.UP;
        }
        break;
      case DIRECTION.DOWN:
        if(snakeDirection === DIRECTION.DOWN) {
          snake[0].row += 1;
        }
        else if(snakeDirection === DIRECTION.UP) {
          snake[0].row -= 1;
        }
        else if (snakeDirection === DIRECTION.LEFT) {
          snake[0].row += 1;
          snakeDirection = DIRECTION.DOWN;
        }
        else {
          snake[0].row += 1;
          snakeDirection = DIRECTION.DOWN;
        }
        break;
      case DIRECTION.LEFT:
        if(snakeDirection === DIRECTION.DOWN) {
          snake[0].column -= 1;
          snakeDirection = DIRECTION.LEFT;
        }
        else if(snakeDirection === DIRECTION.UP) {
          snake[0].column -= 1;
          snakeDirection = DIRECTION.LEFT;
        }
        else if (snakeDirection === DIRECTION.LEFT) {
          snake[0].column -= 1;
        }
        else {
          snake[0].column += 1;
        }
        break;
      case DIRECTION.RIGHT:
        if(snakeDirection === DIRECTION.DOWN) {
          snake[0].column += 1;
          snakeDirection = DIRECTION.RIGHT;
        }
        else if(snakeDirection === DIRECTION.UP) {
          snake[0].column += 1;
          snakeDirection = DIRECTION.RIGHT;
        }
        else if (snakeDirection === DIRECTION.LEFT) {
          snake[0].column -= 1;
        }
        else {
          snake[0].column += 1;
        }
        break;
      default:
        break;
    }
  };
  
  
  const checkFood = () => { //aca vemos si eliminamos la cola o no
    if (!(snake[0].row === food.row && snake[0].column === food.column)) {
      //si no come, elimnar cola
      snake.pop();
    }else{
      let flag = 0;
      let randomNumRow = 0;
      let randomNumColumn = 0;
      do {
        randomNumRow = Math.floor(Math.random() * BOARD_SIZE); 
        randomNumColumn = Math.floor(Math.random() * BOARD_SIZE); 
        for (let i=0; i<snake.length; i++) {
          if(snake[i].row === randomNumRow && snake[i].column === randomNumColumn) {
            flag = 1;
            break;
          }
        }
      }
      while (flag);
      food.row = randomNumRow;
      food.column = randomNumColumn;
      propScore();
    }
  };

  const checkColision = () => {
    if(snake[0].row >= BOARD_SIZE || snake[0].row < 0 || snake[0].column >= BOARD_SIZE || snake[0].column < 0) {
      return 1;
    }else{
      let rowHead = snake[0].row;
      let columnHead = snake[0].column;
      for (let i=1 ; i<snake.length ; i++) {
        if(snake[i].row === rowHead && snake[i].column === columnHead) {
          return 1;
        }
      }
    }
    return 0;
  };

  const refreshBoard = () => {
    let newBoard = new Array(BOARD_SIZE).fill(0).map(() => new Array(BOARD_SIZE).fill(TYPE.typeEmpty));
    newBoard[food.row][food.column] = TYPE.typeFood;
    snake.map((x,indx) => {
      if(indx===0) {
        newBoard[x.row][x.column] = TYPE.typeSnakeHead;
      }else{
        newBoard[x.row][x.column] = TYPE.typeSnake;
      }
    });
    setBoard(newBoard);
  };

  useEffect(() => {
    window.addEventListener('keydown', e => {
      handleKeyDown(e);
    });
  }, []);

  useInterval(() => {
    moveSnake();
    checkFood();
    if(checkColision()) {
      propGameOver();
      createFirstBoard();
      return;
    }
    refreshBoard();
  }, TICK_INTERVAL);

  return(
    <div className='board'>
      {board.map((row, rowIndx) => (
        <div key={rowIndx} className='row'>
          {row.map((cell, cellIndx) => (
            <div key={cellIndx} className={isSnakeCell(rowIndx,cellIndx) ? 'cell snake-cell' : 
            (isFoodCell(rowIndx,cellIndx) ? 'cell food-cell' : 
            (isSnakeHeadCell(rowIndx,cellIndx) ? 'cell snake-head-cell' : 'cell'))}>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

}

export default Board;