import CardsList from "./cards-list.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {offers} from "../mocks";

it(`Render CardsList`, () => {
  const tree = renderer
    .create(<CardsList
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
