import "./Game.css";
import React, { useReducer, useEffect, useContext, useState } from "react";

import GameHead from "./GameHead";
import GameBody from "./GameBody";
import GameScore from "./GameScore";
import GameContext from "../../Contect/game-context";
import CpuLogic from "../../logic/cpuLogic";
import PlayerContext from "../../Contect/player-context";
let hasWinner = false
const checkWinner = (arr) => {
  let doesWon = false;
  const accepted = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];
  accepted.forEach((acceptedArr) => {
    const isAccepted = acceptedArr.every((n) => {
      return arr.includes(n - 1);
    });

    if (isAccepted) {
      doesWon = true;
    }
  });
  return doesWon;
};
let timeout;
const useReducerFunction = (state, action) => {
  if (action.type === "CLOSE_SELECTED") {
    const newState = {
      selectedHash: [...state.selectedHash],
      selectedClose: [...state.selectedClose, action.number],
      currentPlayer: "hash",
    };
    if (checkWinner(newState.selectedClose)) {
      console.log("closeWon");
      hasWinner=true
      
    }

    return newState;
  }
  if (action.type === "HASH_SELECTED") {
    const newState = {
      selectedHash: [...state.selectedHash, action.number],
      selectedClose: [...state.selectedClose],
      currentPlayer: "close",
    };
    if (checkWinner(newState.selectedHash)) {
      console.log("hash won");
      hasWinner=true
      
    }

    return newState;
  }

  return {
    selectedHash: [],
    selectedClose: [],
    currentPlayer: "close",
  };
};
const Game = (probs) => {
  const [hashChanged, setHashChanged] = useState(false);
  const ctx = useContext(PlayerContext);

  // const
  const [gameState, gameStateDispatch] = useReducer(useReducerFunction, {
    selectedHash: [],
    selectedClose: [],
    currentPlayer: "close",
  });
  
  useEffect(() => {
    const NextMove = CpuLogic([
      ...gameState.selectedClose,
      ...gameState.selectedHash,
    ]);

    if (ctx.opponent === "cpu" && hashChanged) {
      timeout = setTimeout(() => {
        if(ctx.playerMark==='hash'&&!hasWinner){
            gameStateDispatch({ type: "CLOSE_SELECTED", number: NextMove });
        }else{
            if(!hasWinner){

                gameStateDispatch({ type: "HASH_SELECTED", number: NextMove });
            }
        }
      }, 200);
    }
  }, [hashChanged]);

  useEffect((x) => {
    if (ctx.playerMark === "hash" && ctx.opponent === "cpu") {
      setHashChanged(true);
    }
  }, []);

  const addHashHandler = (number) => {
    gameStateDispatch({ type: "HASH_SELECTED", number: number });
  };
  const addCloseHandler = (number) => {
    gameStateDispatch({ type: "CLOSE_SELECTED", number: number });
  };
  const setCurrentPlayerHandler = (player) => {};
  const resetHandler = (e) => {
    gameStateDispatch({ type: "RESET" });
  };
  const hashChangerHandler = (e) => {
    
    setHashChanged((prw) => {
      return prw + 1;
    });
  };
  return (
    <div className="game">
      <GameContext.Provider
        value={{
          selectedHash: gameState.selectedHash,
          selectedClose: gameState.selectedClose,
          currentPlayer: gameState.currentPlayer,
          setCurrentPlayer: setCurrentPlayerHandler,
          addHash: addHashHandler,
          addClose: addCloseHandler,
          reset: resetHandler,
          hashChanger: hashChangerHandler,
        }}
      >
        <GameHead></GameHead>
        <GameBody></GameBody>
      </GameContext.Provider>
    </div>
  );
};
export default Game;
