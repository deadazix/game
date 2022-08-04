import React from "react";
const GameContext =  React.createContext({
    selectedHash :[],
    selectedClose:[],
    currentPlayer:'close',
    setCurrentPlayer:()=>{},
    addHash:()=>{},
    addClose:()=>{},
})
export default GameContext