import "./Game.css";
import React, { useReducer } from "react";
import Logo from "../../UI/Logo";
import GameHead from "./GameHead";
import GameBody from "./GameBody";
import GameScore from "./GameScore";
import GameContext from "../../Contect/game-context";
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
const useReducerFunction = (state, action) => {
  if (action.type === "CLOSE_SELECTED") {
    const newState = {
      selectedHash: [...state.selectedHash],
      selectedClose: [...state.selectedClose, action.number],
      currentPlayer: "hash",
    };
    if (checkWinner(newState.selectedClose)) {
      console.log("closeWon");
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
  // const
  const [gameState, gameStateDispatch] = useReducer(useReducerFunction, {
    selectedHash: [],
    selectedClose: [],
    currentPlayer: "close",
  });

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
        }}
      >
        <GameHead></GameHead>
        <GameBody></GameBody>
      </GameContext.Provider>
    </div>
  );
};
export default Game;
