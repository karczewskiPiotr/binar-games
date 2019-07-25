import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Star from "./star";

const Rating = ({ rating, interactive, gameId }) => {
  const [state, updateState] = useState({
    hoverRating: rating,
    rating: rating
  });

  const updateUserRating = () => {
    axios
      .patch(`/api/v1/games/${gameId}`, {
        id: gameId,
        rating: state.hoverRating
      })
      .then(
        updateState(rest => {
          return { ...rest, rating: state.hoverRating };
        })
      );
  };

  const handleHover = rating => {
    updateState(rest => {
      return { ...rest, hoverRating: rating };
    });
  };

  const handleLeave = () => {
    updateState(rest => {
      return { ...rest, hoverRating: state.rating };
    });
  };

  return (
    <span className="star-rating" onMouseLeave={handleLeave}>
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          full={star <= (interactive ? state.hoverRating : state.rating) || 0}
          handleClick={updateUserRating}
          handleHover={handleHover}
          index={star}
        />
      ))}
    </span>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired
};

Rating.defaultProps = {
  rating: 0,
  interactive: false
};

export default Rating;
