import React, { useState,useContext } from "react";
import "./startPopup.css";
import PlayerHash from "../../assets/images/PlayerHash";
import PlayerClose from "../../assets/images/PlayerClose";
import PlayerContext from "../../Contect/player-context";



const StartPopup = (probs) => {
  const ctx =  useContext(PlayerContext)
 
  const {playerMark,onChangePlayerMark:setPlayerMark} = ctx
  const ChoosePlayerHandler = (e) => {
    e.target.closest(".container-choose").classList.contains("hash")
      ? setPlayerMark("hash")
      : setPlayerMark("close");
  };
  return (
    <div className="popup">
      <h3 className="font-header popup__header">pick player 1's mark</h3>
      <div className="popup__choose">
        <div
          onClick={ChoosePlayerHandler}
          className={`close container-choose ${
            playerMark === "close" ? "choosen" : ""
          }`}
        >
          <PlayerClose className="popup__option"></PlayerClose>
        </div>
        <div
          onClick={ChoosePlayerHandler}
          className={`hash container-choose ${
            playerMark != "close" ? "choosen" : ""
          }`}
        >
          <PlayerHash className="popup__option"></PlayerHash>
        </div>
      </div>
      <p className="font-light">REMEMBER: X GOES FIRST </p>
    </div>
  );
};
export default StartPopup;
