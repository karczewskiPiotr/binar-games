import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Game from "../components/games/game";
import Searchbar from "../components/games/searchbar";

const GamesList = () => {
  const [state, updateState] = useState({
    games: [],
    loading: true,
    searchPhrase: ""
  });

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
          loading: false,
          searchPhrase: ""
        });
      });
  };

  const handleSearch = searchPhrase => {
    updateState(rest => {
      return { ...rest, searchPhrase: searchPhrase };
    });
  };

  const getGames = () => {
    return state.searchPhrase
      ? state.games.filter(game => {
          return game.title.toLowerCase().search(state.searchPhrase) !== -1;
        })
      : state.games;
  };

  useEffect(fetchGames, []);

  return (
    <>
      <Searchbar handleSearch={handleSearch} />
      <div className="row header">
        <div className="col-md">Title</div>
        <div className="col-md">Category</div>
        <div className="col-md rating">Rating</div>
      </div>
      {state.loading
        ? "Loading"
        : getGames().map(game => (
            <Game key={game.id} fetchGames={fetchGames} game={game} />
          ))}
    </>
  );
};

ReactDOM.render(
  <GamesList />,
  document.getElementsByClassName("games-list")[0]
);
