import React, { useState } from "react";
import Rating from "./Rating";
import GameDetailsButton from "./gameDetailsButton";
import GameDetails from "./gameDetails";

const Game = ({ game }) => {
  const [state, updateState] = useState({ detailsVisible: false });

  const expandDetails = () => {
    updateState({ detailsVisible: !state.detailsVisible });
  };

  return (
    <>
      <div className="row game">
        <div className="col-md">{game.title}</div>
        <div className="col-md">{game.category}</div>
        <div className="col-md rating">
          <Rating rating={game.global_rating} />
        </div>
        <div className="col-md-auto game-details-button-wrapper">
          <GameDetailsButton
            visibility={state.detailsVisible}
            expandDetails={expandDetails}
          />
        </div>
      </div>
      <GameDetails visibility={state.detailsVisible} game={game} />
    </>
  );
};

export default Game;
