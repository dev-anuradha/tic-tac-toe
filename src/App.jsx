import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import { useState } from 'react';
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './components/GameOver.jsx';

const PLAYERS = {
  X: {name: 'Player 1', score: 0},
  O: {name: 'Player 2', score: 0}
}

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveGameBoard(gameTurns){
  const gameBoard = [...INITIAL_GAMEBOARD.map(array => [...array])];
  for(const turn of gameTurns){
      const {row, col} = turn.square;
      gameBoard[row][col] = turn.player;
  }
  return gameBoard;
}

function deriveActivePlayer(gameTurns){
  let curPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') curPlayer = 'O';
  return curPlayer;
}

function deriveWinner(players, gameBoard){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol].name;
      players[firstSquareSymbol].score++;
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(players, gameBoard);
  const hasDraw = !winner && gameTurns.length === 9;

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      // return {...prevPlayers,
      //   [symbol]: newName
      // }
      const curPlayers =  {...prevPlayers};
      curPlayers[symbol].name = newName;
      return curPlayers;
    })
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns((prevTurns)=>{
      const curPlayer = deriveActivePlayer(prevTurns); //need to call this here as we are deriving the state based on previous turns state.
      const updateGameTurns = [
        {square: { row: rowIndex, col: colIndex},player: curPlayer}
        , ...prevTurns]
      return updateGameTurns;
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS['X'].name} symbol={'X'} isActive={activePlayer==='X'} onNameChange={handlePlayerNameChange}></Player>
          <Player initialName={PLAYERS['O'].name} symbol={'O'} isActive={activePlayer==='O'} onNameChange={handlePlayerNameChange}></Player>
        </ol>
        {/* <ol id='scores'>
          <li>Score: {players['X'].score}</li>
          <li>Score: {players['O'].score}</li>
        </ol> /*Uncomment if you want to see scores*/}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns} players={players}/>
    </main>
  )
}

export default App
