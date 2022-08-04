import "./Logo.css";
import PlayerClose from "../assets/images/PlayerClose";
import PlayerHash from "../assets/images/PlayerHash";
const Logo = (probs) => {
  return (
    <div>
      < PlayerClose className='logo-svg logo-close'/>
      <PlayerHash className="logo-svg logo-hash"/>

    </div>
  );
};
export default Logo;
