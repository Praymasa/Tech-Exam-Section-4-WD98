import React, { useState } from "react";
import "./App.css";

type Player = "X" | "O" | null;

const initialBoard: Player[] = Array(9).fill(null);

const calculateWinner = (squares: Player[]): Player | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Square: React.FC<{ value: Player; onClick: () => void }> = ({
  value,
  onClick,
}) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Board: React.FC<{ squares: Player[]; onClick: (i: number) => void }> = ({
  squares,
  onClick,
}) => (
  <div className="board">
    {[0, 1, 2].map((row) => (
      <div className="row" key={row}>
        {squares.slice(row * 3, row * 3 + 3).map((square, col) => (
          <Square
            key={col}
            value={square}
            onClick={() => onClick(row * 3 + col)}
          />
        ))}
      </div>
    ))}
  </div>
);

const Game: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(initialBoard);
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const handleClick = (i: number) => {
    const squares = [...board];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setBoard(squares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-info">
        <div>
          <h2>{status}</h2>
        </div>
      </div>
      <div className="game-board">
        <Board squares={board} onClick={handleClick} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="card">
        <Game />
      </div>
    </div>
  );
}
