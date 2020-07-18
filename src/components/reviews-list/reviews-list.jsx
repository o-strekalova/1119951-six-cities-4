import PropTypes from "prop-types";
import React from "react";
import Review from "../review/review.jsx";

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
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    text: PropTypes.string.isRequired,
  }))
  .isRequired,
};

export default React.memo(ReviewsList);
