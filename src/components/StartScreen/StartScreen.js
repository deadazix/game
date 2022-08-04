
import "./StartScreen.css";
import React,{useContext} from "react";
import StartPopup from "./StartPopup";
import Logo from "../../UI/Logo";
import ButtonPrimary from "../../UI/ButtonPrimary"
import PlayerContext from "../../Contect/player-context";
const StartScreen = (probs) => {
  const ctx = useContext(PlayerContext)

  const onClickHandler = e=>{
 
      
     ctx.onChangeOpponent(e.target.classList[0].replace('btn-',''))
      
  }
  return (
    <div className="u-text-align-center start-screen">
      <Logo></Logo>
      <StartPopup/>
      <div>
      <ButtonPrimary  onClick={onClickHandler} className='btn-cpu'>new game (vs cpu)</ButtonPrimary>
      <ButtonPrimary onClick={onClickHandler} className='btn-player'>new game (vs player)</ButtonPrimary>
      </div>
      

    </div>
  );
};
export default StartScreen;
