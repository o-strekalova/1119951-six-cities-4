import App from "./app.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {offers} from "../mocks";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      placesCount={312}
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
