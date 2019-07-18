import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Game from "../components/games/game";

const GamesList = () => {
  const [state, updateState] = useState({ games: [], loading: true });

  const compare = (a, b) => (b > a) - (b < a);

  const fetchGames = () => {
    axios
      .get("/api/v1/games", {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(response => {
        updateState({
          games: response.data.data.sort((a, b) => {
            return (
              compare(a.rating, b.rating) ||
              compare(b.title.toLowerCase(), a.title.toLowerCase())
            );
          }),
          loading: false
        });
      });
  };

  useEffect(fetchGames, []);

  return (
    <>
      <div className="row" id="header">
        <div className="col-md">Title</div>
        <div className="col-md">Category</div>
        <div className="col-md rating">Rating</div>
      </div>
      {state.games.map(game =>
        state.loading ? (
          "Loading"
        ) : (
          <Game key={game.id} fetchGames={fetchGames} game={game} />
        )
      )}
    </>
  );
};

ReactDOM.render(<GamesList />, document.getElementById("games-list"));
