import React from "react";
const PlayerContext =  React.createContext({
    player:'close',
    onChangePlayerMark:()=>{},
    opponent:'cpu',
    onChangeOpponent:()=>{}
})
export default PlayerContext