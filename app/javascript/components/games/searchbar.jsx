import React from "react";

const Searchbar = ({ handleSearch }) => {
  const updateSearchPhrase = event => {
    handleSearch(event.target.value.toLowerCase());
  };

  return (
    <input
      type="text"
      placeholder="Search"
      className="col-md search"
      onChange={updateSearchPhrase}
    />
  );
};

export default Searchbar;
