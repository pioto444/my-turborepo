import { useState } from 'react'

type Cell = 'X' | 'O' | null;
type Result = 'X' | 'O' | 'draw' | null;
type Coord = [number, number];

const winningCombinations: Coord[][] = [
  // Rows
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  // Columns
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  // Diagonals
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

const createEmptyBoard = (): Cell[][] => Array(3).fill(Array(3).fill(null));

function App() {
  const [board, setBoard] = useState<Cell[][]>(createEmptyBoard());
  const [started, setStarted] = useState(false);
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Result>(null);
  const [winLine, setWinLine] = useState<Coord[] | null>(null);

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setTurn('X');
    setStarted(true);
    setWinner(null);
    setWinLine(null);
  }

  const handleCellClick = (row: number, col: number) => {
    if (!started || winner) return;
    if (board[row][col] !== null) return;

    const newBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? turn : cell)),
    )
    setBoard(newBoard);

    if (!checkWinner(newBoard)) {
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  }

  const checkWinner = (board: Cell[][] ) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      const mark = board[a[0]][a[1]];
      if (mark && mark === board[b[0]][b[1]] && mark === board[c[0]][c[1]]) {
        //Winner
        setWinner(mark);  
        setWinLine(combination);
        return true;
        // setBoard(createEmptyBoard());
        // setStarted(false);
      }
    }

    //Draw
    if (board.flat().every(cell => cell !== null)) {
      setWinner('draw');
      return true;
    }

    return false;
  }
  
  const status = !started ? " " : winner === 'draw' ? "It's a draw!" : winner ? `Player ${winner} wins!` : `Player ${turn}'s turn`;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <header className="text-2xl font-bold mb-4">Tic Tac Toe</header>

      <p className="mb-4 text-lg">{status}</p>

      <div className="relative">
        <table className="border-collapse">
            <tbody>
              {[0, 1, 2].map((row) => (
                <tr key={row}>
                  {[0, 1, 2].map((col) => (
                    <td
                      key={col}
                      className={`w-20 h-20 text-center text-3xl border-black ${row < 2 ? 'border-b-2' : ''} ${col < 2 ? 'border-r-2' : ''}`}
                      onClick={() => handleCellClick(row, col)}
                    >
                      {board[row][col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
        </table>
        
        {winLine && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 3 3" preserveAspectRatio="none">
            <line
              x1={winLine[0][1] + 0.5}
              y1={winLine[0][0] + 0.5}
              x2={winLine[2][1] + 0.5}
              y2={winLine[2][0] + 0.5}
              stroke="black"
              strokeWidth={6}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}
      </div>

      <button onClick={resetGame} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {started ? "Restart Game" : "Start Game"}
      </button>
    </div>
  )
}

export default App
