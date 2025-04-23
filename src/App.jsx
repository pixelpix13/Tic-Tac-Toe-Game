import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import {useState} from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winningCombinations";
import GameOver from "./components/GameOver";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  //here is how we can derive the active player from the game turns array
  //how this works is that we are checking if the first element in the game turns array is an X or an O
  //if it is an X then the current player is an O and vice versa

  let currentPlayer = 'X'; //this is done to set the default value of the current player to X
  if(gameTurns.length>0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}


function App() {
  const[gameTurns, setGameTurns] = useState([]);

  //below we are createing a state for the players so that we can set the player name in the game over component
  const[player, setPlayers] = useState({
    X:"Player 1",
    O:"Player 2"
  });
  
  //we are using the spread operator to create a new array from the initial board array
  //we do this because we don't want to mutate the initial board array
  //we are also using map and then spread operator in there to create a new array inside the gameboard array since it has nested arrays
  //without spread operator we would be mutating the initial board array and resulting in a bug i.e. restarting the game would not work as expected
  let gameBoard = [...initialBoard.map(array => [...array])];

  //winner is a variable that will be used to store the winner of the game and passing it to the game over component
  let winner;
  //const[activePlayer, setActivePlayer] = useState("X");
  const  activePlayer = deriveActivePlayer(gameTurns);
  //we removed the active player state because there was no need for another state rather we can derive the active player from the games turns array
  for(const turn of gameTurns) {
    console.log(turn);
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player;
  }
  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol && firstSquareSymbol !== null) {
      winner = player[firstSquareSymbol];
    } 
  }
  const handleSetactivePlayer = (rowIndex, colIndex) => {
    //setActivePlayer(currentActivePlayer => currentActivePlayer === "X" ? "O" : "X");

    //here the turns array stores the turns of the game and the turns are stored in the form of objects with the square and the player who made the turn.
    //so how it works is that we are taking the previous turns and then we are adding the new turn to the previous turns and then we are setting the new turns to the state.
    //the if condition is used to check if the previous turns are empty or not. If they are empty then we are setting the current player to "X" and if they are not empty then we are setting the current player to "O".
    //this is done to make sure that the first player is always "X" and the second player is always "O"
    //the gameturns is sent as a prop to the GameBoard component so that it can be used to update the game board.
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns];
      return updatedTurns;
    })
  }
  const hasDrawn = gameTurns.length === 9 && !winner;

  //this funcrtion is used to handle the resenting of the game board
  function handleRematch() {
    setGameTurns([]);
  }

  //this function is used to handle the player name change
  //what we are doing here is that we are taking the previous players and then we are updating the player name and then we are returning the new players.
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      }
    })
  }
  return (
    <main>
      <div id= "game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDrawn) && <GameOver winner={winner} onRestart = {handleRematch}/>}
        <GameBoard onSquareSelect={handleSetactivePlayer} board = {gameBoard}/>
      </div>

      <Log turns={gameTurns} player={player}/>
    </main>
  )
}

export default App
