import React from "react";
import PropTypes from "prop-types";
import Star from "./star";

const Rating = ({ rating }) => {
  return (
    <span className="star-rating">
      {[1, 2, 3, 4, 5].map(star => (
        <Star key={star} full={star <= rating || 0} />
      ))}
    </span>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired
};

export default Rating;
