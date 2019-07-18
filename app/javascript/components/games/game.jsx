import React, { useState, useEffect } from "react";
import Rating from "./Rating";

const Game = ({ fetchGames, game }) => {
  return (
    <div className="row" id="game">
      <div className="col-md">{game.title}</div>
      <div className="col-md">{game.category}</div>
      <div className="col-md rating">
        <Rating rating={game.rating} />
      </div>
    </div>
  );
};

export default Game;
