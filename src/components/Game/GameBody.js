import React from "react";
import "./GameBody.css";
import GameBlock from "./GameBlock";

const GameBody = (probs) => {
  const arr = new Array(9).fill(1);

  return (
    <div className="body">
        {arr.map((item,index)=>{
           return <GameBlock key={index} keyBlock={index}></GameBlock>
        })}
      
    </div>
  );
};
export default GameBody;
