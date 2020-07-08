import React from "react";
import renderer from "react-test-renderer";
import Review from "./review.jsx";
import {offersAll} from "../mocks";

const review = offersAll[0].offers[0].reviews[0];

it(`Render Review`, () => {
  const tree = renderer
    .create(<Review
      key={review.id}
      review={review}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
