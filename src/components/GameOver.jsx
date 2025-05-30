export default function GameOver({winner, onRestart}) {
  return (
    <div id="game-over">
        <p>Game Over!</p>
        {winner ? <p>{winner} won!</p> : <p>It's a Draw!</p>}
        <p>
            <button onClick={onRestart}>Rematch!</button>
        </p>
    </div>
  )
}