import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";
import {reviews} from "../mocks";

it(`Render Review`, () => {
  const tree = renderer
    .create(
        <Review
          key={reviews[0].id}
          review={reviews[0]}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
