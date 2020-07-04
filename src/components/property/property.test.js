import Property from "./property.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {offers, reviews} from "../mocks";

const offer = offers[0];

it(`Render Property`, () => {
  const tree = renderer
    .create(<Property
      offer={offer}
      reviews={reviews}
      offersNear={offers}
    />, {
      createNodeMock: () => {
        return document.createElement(`DIV`);
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
