import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";
import {reviews} from "../mocks";

const review = reviews[0];

it(`Render Review`, () => {
  const tree = renderer
    .create(<Review
      key={review.id}
      review={review}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
