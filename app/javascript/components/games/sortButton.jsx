import React, { useState, useEffect } from "react";

const SortButton = ({ handleSort, sortedElement }) => {
  const [state, updateState] = useState({
    position: "default"
  });

  const renderIcon = () => {
    switch (state.position) {
      case "default":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path d="M19 13H5v-2h14v2z" fill="#5c20e9b9" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        );
      case "up":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
              fill="#5c20e9b9"
            />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        );
      case "down":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z" />
            <path
              d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
              fill="#5c20e9b9"
            />
          </svg>
        );
    }
  };

  const handleClick = () => {
    switch (state.position) {
      case "default":
        updateState({
          position: "down"
        });
        handleSort(`${sortedElement}_asc`);
        break;
      case "down":
        updateState({
          position: "up"
        });
        handleSort(`${sortedElement}_desc`);
        break;
      case "up":
        updateState({
          position: "default"
        });
        handleSort("none");
        break;
    }
  };

  return (
    <button type="button" className="sort-button" onClick={handleClick}>
      {renderIcon()}
    </button>
  );
};

export default SortButton;
