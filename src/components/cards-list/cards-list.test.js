import React from "react";
import renderer from "react-test-renderer";
import CardsList from "./cards-list.jsx";
import {offersAll} from "../mocks";

it(`Render CardsList Main`, () => {
  const tree = renderer
    .create(
        <CardsList
          className={`cities__places-list tabs__content`}
          offers={offersAll[0].offers}
          onCardTitleClick={() => {}}
          onCardHover={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render CardsList Property`, () => {
  const tree = renderer
    .create(
        <CardsList
          className={`near-places__list`}
          offers={offersAll[0].offers}
          onCardTitleClick={() => {}}
          onCardHover={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
