import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Sticky from "react-sticky-el";
import Game from "../components/games/game";
import Searchbar from "../components/games/searchbar";
import FilterDropdwon from "../components/games/filterDropdown";
import SortButton from "../components/games/sortButton";
import LoadingIcon from "../components/loadingIcon";
import FlipMove from "react-flip-move";

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
      return game.category.toLowerCase().includes(state.filterCondition);
    }
  };

  const sortGmes = (a, b) => {
    switch (state.sortCondition) {
      case "default":
        return (
          compare(a.global_rating, b.global_rating) ||
          compare(b.title.toLowerCase(), a.title.toLowerCase())
        );
      case "title_asc":
        return (
          compare(b.title.toLowerCase(), a.title.toLowerCase()) ||
          compare(a.global_rating, b.global_rating)
        );
      case "title_desc":
        return (
          compare(a.title.toLowerCase(), b.title.toLowerCase()) ||
          compare(a.global_rating, b.global_rating)
        );
      case "category_asc":
        return (
          compare(b.category.toLowerCase(), a.category.toLowerCase()) ||
          compare(a.global_rating, b.global_rating)
        );
      case "category_desc":
        return (
          compare(a.category.toLowerCase(), b.category.toLowerCase()) ||
          compare(a.global_rating, b.global_rating)
        );
      case "rating_asc":
        return (
          compare(b.global_rating, a.global_rating) ||
          compare(b.title.toLowerCase(), a.title.toLowerCase())
        );
      case "rating_desc":
        return (
          compare(a.global_rating, b.global_rating) ||
          compare(b.title.toLowerCase(), a.title.toLowerCase())
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
        <FilterDropdwon
          handleFiltration={handleFiltration}
          currentCondition={state.sortCondition}
        />
      </div>
      <Sticky className="row header" stickyStyle={styleOnStick}>
        <div className="col-md">
          Title
          <SortButton
            handleSort={handleSort}
            sortedElement="title"
            currentCondition={state.sortCondition}
          />
        </div>
        <div className="col-md">
          Category
          <SortButton
            handleSort={handleSort}
            sortedElement="category"
            currentCondition={state.sortCondition}
          />
        </div>
        <div className="col-md rating">
          Rating
          <SortButton
            handleSort={handleSort}
            sortedElement="rating"
            currentCondition={state.sortCondition}
          />
        </div>
      </Sticky>
      {state.loading ? (
        <div className="loading-games">
          <LoadingIcon />
        </div>
      ) : (
        <FlipMove appearAnimation="elevator">
          {getGames().map(game => {
            return (
              <div key={game.id}>
                <Game game={game} />
              </div>
            );
          })}
        </FlipMove>
      )}
    </>
  );
};

ReactDOM.render(
  <GamesList />,
  document.getElementsByClassName("games-list")[0]
);

const styleOnStick = {
  zIndex: 100,
  marginTop: "20px",
  maxWidth: "1000px",
  backgroundColor: "#CACBEE"
};
