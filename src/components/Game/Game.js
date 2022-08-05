import "./Game.css";
import React, { useReducer, useEffect, useContext, useState } from "react";
import OverLay from "../../UI/OverLay";
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
  
  if(action.type==='EXIT'){
    return  {
      selectedHash: [],
      selectedClose: [],
      currentPlayer: "close",
      winner:undefined,
      scorePlayer1:0,
      scorePlayer2:0,
      tie:0,
    }
  }
  if (action.type==='NEXT_ROUND'){
    const newState = {
      selectedHash: [],
      selectedClose: [],
      currentPlayer: "close",
      winner:undefined,
      scorePlayer1:state.scorePlayer1,
      scorePlayer2:state.scorePlayer2,
      tie:state.tie,
    }
    return newState
  }

  if (action.type === "CLOSE_SELECTED") {
    let newState = {
      selectedHash: [...state.selectedHash],
      selectedClose: [...state.selectedClose, action.number],
      currentPlayer: "hash",
      winner : checkWinner([...state.selectedClose, action.number])&&'close',
    };
    if (checkWinner(newState.selectedClose)) {  
      hasWinner=true
    }
    if([...state.selectedClose,...state.selectedHash].length==8&&!newState.winner){
      console.log('draw')
      newState =  {
        selectedHash: [...state.selectedHash],
        selectedClose: [...state.selectedClose, action.number],
        currentPlayer: "hash",
        winner : 'draw',
      }
    }
    return newState;
  }
  if (action.type === "HASH_SELECTED") {
    let newState = {
      selectedHash: [...state.selectedHash, action.number],
      selectedClose: [...state.selectedClose],
      currentPlayer: "close",
      winner:checkWinner([...state.selectedHash, action.number])&&'hash'
    };
    if (checkWinner(newState.selectedHash)) {
    
     
      hasWinner=true
      
    }
    if([...state.selectedClose,...state.selectedHash].length==8&&!newState.winner){
      console.log('draw')
      newState = {
        selectedHash: [...state.selectedHash, action.number],
        selectedClose: [...state.selectedClose],
        currentPlayer: "close",
        winner:'draw',
      }
    }

    return newState;
  }

  return {
    selectedHash: [],
    selectedClose: [],
    currentPlayer: "close",
    winner:undefined,
    scorePlayer1:0,
    scorePlayer2:0,
    tie:0,
  };
};
const Game = (probs) => {
  const [hashChanged, setHashChanged] = useState(0);
  const ctx = useContext(PlayerContext);

  // const
  const [gameState, gameStateDispatch] = useReducer(useReducerFunction, {
    selectedHash: [],
    selectedClose: [],
    currentPlayer: "close",
    winner:undefined,
    scorePlayer1:0,
    scorePlayer2:0,
    tie:0,
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
      setHashChanged(1);
    }
  }, []);

  const addHashHandler = (number) => {
    gameStateDispatch({ type: "HASH_SELECTED", number: number });
  };
  const addCloseHandler = (number) => {
    gameStateDispatch({ type: "CLOSE_SELECTED", number: number });
  };
  const resetHandler = (e) => {
    gameStateDispatch({ type: "RESET" });
  };
  const hashChangerHandler = (e) => {
    
    setHashChanged((prw) => {
      return prw + 1;
    });
  };
  const onNextRoundHandler = e=>{
    console.log(ctx.opponent)
    hasWinner=false
    gameStateDispatch({type:'NEXT_ROUND'})
    console.log(ctx.playerMark)
    if(ctx.playerMark==='close'){
      console.log('inside')
      
    }if(ctx.playerMark==='hash'){
      console.log('player mark is hash')
      setHashChanged(20)
    }
    
  }
  const onExitHandler = e=>{
    gameStateDispatch({type:'EXIT'})
    ctx.onExit()
    hasWinner=false

  }
  return (
    <div className="game">
      <GameContext.Provider
        value={{
          selectedHash: gameState.selectedHash,
          selectedClose: gameState.selectedClose,
          currentPlayer: gameState.currentPlayer,

          winner:gameState.winner,

          addHash: addHashHandler,
          addClose: addCloseHandler,
          reset: resetHandler,
          hashChanger: hashChangerHandler,
          onNextRound:onNextRoundHandler,
          onExit:onExitHandler,
        }}
      >
        <GameHead></GameHead>
        <GameBody></GameBody>
        {gameState.winner&& <OverLay></OverLay>}
      </GameContext.Provider>
    </div>
  );
};
export default Game;
