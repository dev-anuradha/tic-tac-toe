// const initialGameBoard = [
//     [null, null, null],
//     [null, null, null],
//     [null, null, null]
// ]

export default function GameBoard({onSelectSquare, board}) {

    
    // const [gameBoard, setGameBoard] = useState(initialGameBoard)
    // const gameBoard = initialGameBoard;
    // for(const turn of turns){
    //     const {row, col} = turn.square;
    //     gameBoard[row][col] = turn.player;
    // }

    // function handleSelectSquare(rowIndex, colIndex){
    //     // setGameBoard((previousGameBoard) => {
    //     //     const updatedBoard = [...previousGameBoard.map(row => [...row])];
    //     //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //     //     return updatedBoard;
    //     // });
    //     
    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => {
                return <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => {
                            return <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button>
                            </li>
                        })}
                    </ol>
                </li>
            })}
        </ol>
    );
}