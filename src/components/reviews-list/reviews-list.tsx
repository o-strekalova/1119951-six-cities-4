import * as React from "react";
import Review from "../review/review";
import {Review as ReviewType} from "../../types";

interface Props {
  reviews: Array<ReviewType>,
}

const MAX_REVIEWS_COUNT = 10;

const ReviewsList: React.FC<Props> = (props: Props) => {
  const {reviews} = props;
  const reviewsSorted = reviews.slice().sort((a, b) => {
    return b.date.valueOf() - a.date.valueOf();
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

export default React.memo(ReviewsList);
