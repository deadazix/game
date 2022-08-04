import "./GameHead.css";
import Logo from "../../UI/Logo";
import PlayerClose from "../../assets/images/PlayerClose";
import PlayerHash from "../../assets/images/PlayerHash";
import Reverse from "../../assets/images/Reverse";


const GameHead = (probs) => {
  return (
    <div className="head">
      <Logo></Logo>
      <div className="head__turnLabel">
        <PlayerClose className="c" />
        Turn
      </div>
      <div className="head__reverse">
        <Reverse className="r"></Reverse>
      </div>
    </div>
  );
};
export default GameHead;
