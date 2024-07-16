export default function Log({playerTurn}){
    return(
        <ol id="log">
            {playerTurn.map((turn) => <li key={`${turn.square.row}${turn.square.col}`}>{turn.player} selected {turn.square.row}, {turn.square.col}</li>)}
        </ol>
    )
}