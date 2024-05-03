import { useState } from "react";

export default function Player({initialName, symbol, isActive, onNameChange}){
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        if(isEditing)onNameChange(symbol, playerName);
        setIsEditing(editing => {
            return !editing;
        });
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if(isEditing)
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick} disabled={playerName === ''}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}