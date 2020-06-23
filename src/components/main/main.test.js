import Main from "./main.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {offers} from "../mocks";

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      placesCount={312}
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
