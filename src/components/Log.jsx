import React from 'react'

function Log ({turns, player}) {
  return (
    <ol id="log">{turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`}>
        {turn.player == 'O'? player.O : player.X}  selected {turn.square.row}{turn.square.col}
        </li>
        )}
    </ol>
  )
}

export default Log;

