import React, { useState } from "react";
import StartScreen from "./components/StartScreen/StartScreen";
import PlayerContext from "./Contect/player-context";

import "./Styles/general.css";
import "./Styles/animation.css";
import "./Styles/typography.css";
import Game from "./components/Game/Game";
// import ChangeTheme from './Styles/changeTheme';
function App() {
  const [player, setPlayer] = useState("close");
  const [opponent, setOpponent] = useState("cpu");
  const [start, setStart] = useState(1);
  const setOpponentHandler = (oponent) => {
    setOpponent((prw) => {
      return oponent;
    });
    setStart(0);
  };
  const onStartHandler = (e) => {
    console.log(e);
  };
  return (
    <PlayerContext.Provider
      value={{
        playerMark: player,
        onChangePlayerMark: setPlayer,
        opponent: opponent,
        onChangeOpponent: setOpponentHandler,

        onStart: onStartHandler,
      }}
    >
      {start ? <StartScreen></StartScreen> : <Game></Game>}
    </PlayerContext.Provider>
  );
}

export default App;
