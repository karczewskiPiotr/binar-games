import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Game from "../components/games/game";
import Searchbar from "../components/games/searchbar";
import FilterDropdwon from "../components/games/filterDropdown";
import SortButton from "../components/games/sortButton";

const GamesList = () => {
  const [state, updateState] = useState({
    games: [],
    loading: true,
    searchPhrase: "",
    filterCondition: "all",
    sortCondition: "none"
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
          searchPhrase: "",
          filterCondition: "all",
          sortCondition: "none"
        });
      });
  };

  const handleSearch = searchPhrase => {
    updateState(rest => {
      return { ...rest, searchPhrase: searchPhrase };
    });
  };

  const handleFiltration = filterCondition => {
    updateState(rest => {
      return { ...rest, filterCondition: filterCondition };
    });
  };

  const handleSort = sortCondition => {
    updateState(rest => {
      return { ...rest, sortCondition: sortCondition };
    });
  };

  const filterByCondition = game => {
    if (state.filterCondition == "all") {
      return state.games;
    } else {
      return game.category.includes(state.filterCondition);
    }
  };

  const sortGmes = (a, b) => {
    switch (state.sortCondition) {
      case "none":
        return (
          compare(a.rating, b.rating) ||
          compare(b.title.toLowerCase(), a.title.toLowerCase())
        );
      case "title_asc":
        return (
          compare(b.title.toLowerCase(), a.title.toLowerCase()) ||
          compare(a.rating, b.rating)
        );
      case "title_desc":
        return (
          compare(a.title.toLowerCase(), b.title.toLowerCase()) ||
          compare(a.rating, b.rating)
        );
    }
  };

  const getGames = () => {
    return state.searchPhrase
      ? state.games
          .sort(sortGmes)
          .filter(filterByCondition)
          .filter(game => {
            return game.title.toLowerCase().includes(state.searchPhrase);
          })
      : state.games.sort(sortGmes).filter(filterByCondition);
  };

  useEffect(fetchGames, []);

  return (
    <>
      <div className="row search-filter">
        <Searchbar handleSearch={handleSearch} />
        <FilterDropdwon handleFiltration={handleFiltration} />
      </div>
      <div className="row header">
        <div className="col-md">
          Title
          <SortButton handleSort={handleSort} sortedElement="title" />
        </div>
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
