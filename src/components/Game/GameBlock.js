import "./GameBlock.css";
import React, { useContext } from "react";
import PlayerClose from "../../assets/images/PlayerClose";
import GameContext from "../../Contect/game-context";
import PlayerHash from "../../assets/images/PlayerHash";

const GameBlock = (probs) => {
  const key = probs.keyBlock;
  const gameCTX = useContext(GameContext);



  const onClickHandler = (e) => {
    
    const target = e.target.closest(".block");

    if ([...gameCTX.selectedHash, ...gameCTX.selectedClose].includes(key))
      return;
    if (gameCTX.currentPlayer === "close") {
      gameCTX.addClose(key);
      gameCTX.hashChanger(true)
     
    }
    if (gameCTX.currentPlayer === "hash") {
      gameCTX.addHash(key);
      gameCTX.hashChanger(true)
      
   
    }
  };
  return (
    <div onClick={onClickHandler} className="block">
      {gameCTX.selectedClose.includes(key) && <PlayerClose className='cyan' />}
      {gameCTX.selectedHash.includes(key) && <PlayerHash className='orange' />}
    </div>
  );
};

export default GameBlock;
