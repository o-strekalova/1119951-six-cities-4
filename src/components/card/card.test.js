import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Card from "./card.jsx";
import {offersAll} from "../mocks";
import history from "../../history";

const offer = offersAll[0];

it(`Render Card Main`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Card
            key={offer.title + offer.id}
            className={`cities__place-card`}
            isToggleChecked={offer.isFavorite}
            offer={offer}
            onCardTitleClick={() => {}}
            onCardHover={() => {}}
            onFavoriteButtonClick={() => {}}
            onToggleClick={() => {}}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Card Property`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Card
            key={offer.title + offer.id}
            className={`near-places__card`}
            isToggleChecked={offer.isFavorite}
            offer={offer}
            onCardTitleClick={() => {}}
            onCardHover={() => {}}
            onFavoriteButtonClick={() => {}}
            onToggleClick={() => {}}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
