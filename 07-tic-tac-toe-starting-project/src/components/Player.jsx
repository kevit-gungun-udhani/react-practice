import { useState } from "react"

export default function Player({name, symbol}){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);
    function handleEditClick(){
        setIsEditing((editing) => !editing );
    }

    function handleChange(event){
        console.log(event)
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    }

    return (
        <li>
           <span className="player">
            {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
           </span>
           <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}