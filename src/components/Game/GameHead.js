import "./GameHead.css";
import Logo from "../../UI/Logo";
import PlayerClose from "../../assets/images/PlayerClose";
import PlayerHash from "../../assets/images/PlayerHash";
import Reverse from "../../assets/images/Reverse";
import React,{useContext } from "react";
import GameContext from "../../Contect/game-context";
const GameHead = (probs) => {
   const  gameContext = useContext(GameContext)
   const reverseHandler = (e)=>{
    gameContext.reset()
   }
  return (
    <div className="head">
      <Logo></Logo>
      <div className="head__turnLabel">
        {gameContext.currentPlayer==='close'&&<PlayerClose className="c" />}
        {gameContext.currentPlayer==='hash'&&<PlayerHash className="c" />}
        Turn
      </div>
      <div onClick={reverseHandler} className="head__reverse">
        <Reverse  className="r"></Reverse>
      </div>
    </div>
  );
};
export default GameHead;
