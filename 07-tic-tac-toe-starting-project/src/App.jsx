import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns){
  let activePlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    activePlayer = 'O';
  }

  return activePlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player;
  }
  return gameBoard
}

function deriveWinner(gameBoard, player){

  let winner = null;

  for(const combinations of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column]
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column]
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column]

    console.log(firstSquareSymbol, secondSquareSymbol, thirdSquareSymbol)

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = player[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const[player, setPlayer] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, player);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(
      (prevTurns) => {
        const activePlayer = deriveActivePlayer(prevTurns);
        const updateTurns = [{square: {row: rowIndex, col: colIndex}, player: activePlayer} ,...prevTurns]
        return updateTurns;
      }
    );
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handleChangePlayerName(symbol, newName){

    setPlayer(
      (prevPlayer) => {
        return {
          ...prevPlayer,
          [symbol]: newName
        }
      }
    )
    
  }

  return (
   <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onNameChange={handleChangePlayerName}/>
          <Player name={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onNameChange={handleChangePlayerName}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart = {handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log playerTurn = {gameTurns} />
   </main>
  )
}

export default App
