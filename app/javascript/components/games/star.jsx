import React from "react";

const Star = ({ full, handleHover, handleClick, handleLeave, index }) => {
  const handleMouseOver = () => {
    handleHover(index);
  };

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      height="1.5em"
      className="star"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <g transform="scale(.95) translate(15,15)">
        <path
          stroke="rgba(0,0,0,.85)"
          strokeWidth="30"
          fill={full ? "gold" : "transparent"}
          d="M492.867,181.444l-149.825-21.785L276.014,23.861c-8.187-16.59-31.844-16.589-40.031,0l-67.026,135.799L19.133,181.445c-18.306,2.662-25.615,25.158-12.369,38.071l108.408,105.682L89.592,474.44c-3.125,18.232,16.012,32.136,32.386,23.528l132.475-70.452l134.025,70.451c17.914,8.607,37.051-5.296,33.926-23.528l-25.578-149.241l108.409-105.685C518.482,206.601,511.173,184.105,492.867,181.444z"
        />
      </g>
    </svg>
  );
};

export default Star;
