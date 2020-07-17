import React from "react";
import renderer from "react-test-renderer";
import Card from "./card.jsx";
import {offersAll} from "../mocks";

const offer = offersAll[0].offers[0];

it(`Render Card Main`, () => {
  const tree = renderer
    .create(
        <Card
          key={offer.title + offer.id}
          className={`cities__place-card`}
          offer={offer}
          onCardTitleClick={() => {}}
          onCardHover={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Card Property`, () => {
  const tree = renderer
    .create(
        <Card
          key={offer.title + offer.id}
          className={`near-places__card`}
          offer={offer}
          onCardTitleClick={() => {}}
          onCardHover={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
