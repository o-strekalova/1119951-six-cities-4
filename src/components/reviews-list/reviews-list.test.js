import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";
import {offersAll} from "../mocks";

it(`Render Reviews List`, () => {
  const tree = renderer
    .create(
        <ReviewsList
          reviews={offersAll[0].offers[0].reviews}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
