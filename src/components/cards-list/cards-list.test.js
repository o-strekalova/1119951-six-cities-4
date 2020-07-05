import CardsList from "./cards-list.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {offers} from "../mocks";

it(`Render CardsList Main`, () => {
  const tree = renderer
    .create(<CardsList
      className={`cities__places-list tabs__content`}
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render CardsList Property`, () => {
  const tree = renderer
    .create(<CardsList
      className={`near-places__list`}
      offers={offers}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
