import Property from "./property.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {offers} from "../mocks";

const offer = offers[0];

it(`Render Property`, () => {
  const tree = renderer
    .create(<Property
      offer={offer}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
