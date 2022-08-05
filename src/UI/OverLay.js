import "./OverLay.css";
import React, { useContext } from "react";
import GameContext from "../Contect/game-context";
import PlayerContext from "../Contect/player-context";
import PlayerClose from "../assets/images/PlayerClose";
import PlayerHash from "../assets/images/PlayerHash";
import ButtonPrimary from "./ButtonPrimary";
const OverLay = (probs) => {
  const gameCTX = useContext(GameContext);
  const startDataCTX = useContext(PlayerContext);
  const opponent = startDataCTX.opponent;
  const player = startDataCTX.playerMark;
  const winner = gameCTX.winner;
    const nextRoundHandler = (e)=>{
        gameCTX.onNextRound(winner)
    }
    const exitHandler = e=>{
        gameCTX.onExit()

    }
    
  return (
    <div className="over">
      <div className="over__content">
        {player === winner && opponent === "cpu" && <p>you won</p>}
        {player !== winner && opponent === "cpu" && <p>cpu won</p>}
        {'hash' === winner && opponent !== "cpu" && <p>player2 won</p>}
        {player === winner && opponent !== "cpu" && <p>player1 won</p>}
        {'draw' === winner &&<p>DRAW</p>}

        {winner === "close" ? (
          <div className="over__container">
            <PlayerClose className="winner-mark-close" />
            <p className="over__paragraph-close">Takes the Round</p>
          </div>
        ) : ''}
        {winner==='hash'?(
            <div className="over__container">

          <PlayerHash className="winner-mark-hash"></PlayerHash>
          <p className="over__paragraph-hash">Takes the Round</p>
            </div>
        ):''}
        {winner==='draw'?
        <p className="over__paragraph-hash margin">NOBODY WON</p>
        :
        
        ''}
        <div className="over-btn-container">

        <ButtonPrimary onClick={exitHandler} className='btn-exit'>close</ButtonPrimary>
        <ButtonPrimary onClick={nextRoundHandler} className='btn-continue'>next round</ButtonPrimary>
        </div>


      </div>
    </div>
  );
};
export default OverLay;
