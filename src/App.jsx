import './styles.scss';
import { useState } from 'react';
import Board from './components/Board';
import StatusMessage from './components/StatusMessage';
import History from './components/History';
import { calculateWinner } from './winner';
const NEW_GAME =[{ squares: Array(9).fill(null), isXNext: false }];
function App() {

    const [history, setHistory] = useState(NEW_GAME);
    const [currentMove, setCurrentMove] = useState(0);

    const gamingBoard = history[currentMove];
    
    const winner = calculateWinner(gamingBoard.squares);
    

    const handleSquareClick =(clickedPosition) => {
     
        if(gamingBoard.squares[clickedPosition] || winner ){
           return;
        }
   
   setHistory((currentHistory) => {
       const isTraversing = currentMove + 1 !== currentHistory.length;

         const lastGamingState = isTraversing 
            ? currentHistory[currentMove]
            : currentHistory[currentHistory.length - 1 ];

    const nextSquaresState= lastGamingState.squares.map((squareValue, postion) => {
                   if(clickedPosition === postion)
                   {
                       return lastGamingState.isXNext ? 'X' : 'O';
   
                   }
                   return squareValue;
               });
    
    const base = isTraversing 
    ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState + 1))
    : currentHistory;

    return base.concat({ 
           squares: nextSquaresState, 
           isXNext: !lastGamingState.isXNext,
            });
           });
           
   
       setCurrentMove(move => move + 1);
   };

const moveTo =(move) => {
    setCurrentMove(move);

};

return(
 <div className="app">
  <StatusMessage winner= {winner} gamingBoard={gamingBoard} />
 <Board squares ={gamingBoard.squares} handleSquareClick = {handleSquareClick}/>

 <h2>Current game history</h2>
 <History history ={history} moveTo ={moveTo} currentMove={currentMove} />
</div>
);
}

export default App;
