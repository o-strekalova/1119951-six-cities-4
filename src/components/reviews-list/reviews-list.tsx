import PropTypes from "prop-types";
import React from "react";
import Review from "../review/review.js";

const MAX_REVIEWS_COUNT = 10;

const ReviewsList = (props) => {
  const {reviews} = props;
  const reviewsSorted = reviews.slice().sort((a, b) => {
    return b.date - a.date;
  });
  const reviewsShown = reviewsSorted.length <= MAX_REVIEWS_COUNT ? reviewsSorted : reviewsSorted.slice(0, MAX_REVIEWS_COUNT);

  return (
    <ul className="reviews__list">
      {reviewsShown.map((review) => {
        return <Review
          key={review.id}
          review={review}
        />;
      })}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  })),
};

export default React.memo(ReviewsList);
