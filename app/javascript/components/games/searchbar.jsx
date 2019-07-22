import React from "react";

const Searchbar = ({ handleSearch }) => {
  const updateSearchPhrase = event => {
    handleSearch(event.target.value.toLowerCase());
  };

  return (
    <>
      <div className="row search-filter">
        <input
          type="text"
          placeholder="Search"
          className="col-md search"
          onChange={updateSearchPhrase}
        />
      </div>
    </>
  );
};

export default Searchbar;
