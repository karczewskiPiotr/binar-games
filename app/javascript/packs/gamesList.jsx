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
    sortCondition: "default"
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
          sortCondition: "default"
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
      case "default":
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
      case "category_asc":
        return (
          compare(b.category.toLowerCase(), a.category.toLowerCase()) ||
          compare(a.rating, b.rating)
        );
      case "category_desc":
        return (
          compare(a.category.toLowerCase(), b.category.toLowerCase()) ||
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
        <FilterDropdwon handleFiltration={handleFiltration} currentCondition={state.sortCondition}/>
      </div>
      <div className="row header">
        <div className="col-md">
          Title
          <SortButton handleSort={handleSort} sortedElement="title" currentCondition={state.sortCondition}/>
        </div>
        <div className="col-md">
          Category
          <SortButton handleSort={handleSort} sortedElement="category" currentCondition={state.sortCondition}/>
        </div>
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
