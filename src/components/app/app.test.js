import App from "./app.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {offers, reviews} from "../mocks";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      placesCount={312}
      offers={offers}
      reviews={reviews}
    />, {
      createNodeMock: () => {
        return document.createElement(`DIV`);
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
