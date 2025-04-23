import {useState} from "react";

function Player({initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    const handleEditClick = () => {
        setIsEditing(editing =>!editing); //use the function callback and not !isEditing since doing that will always return true even when written twice
        //the reason for that i s that the state is not updated immediately, so it will always return the previous value of the state
        //setIsEditing(!isEditing); //this will not work as expected since the state is not updated immediately
        if(isEditing) {
            onChangeName(symbol, playerName);
        }
        //we are using the onChangeName function to update the player name in the parent component only when the user clicks on the save button
        //i.e. isEditing is true when the user clicks on the save button
    };
    const handleChange = (e) => {
        setPlayerName(e.target.value);
    };
    return (
        <li className={isActive?"active":undefined}>   
        <span className="player">
            {/*Here we are using two way binding to update the state of the playerName variable. It is called two way binding because we are using the value of the input field to update the state of the playerName variable and we are also using the state of the playerName variable to update the value of the input field.*/}
            {isEditing?<input type="text" required value={playerName} onChange={handleChange}/>:<span className="player-name">{playerName}</span>}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing?"Save":"Edit"}</button>
        </li>
    );
};

export default Player;