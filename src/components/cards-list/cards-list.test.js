import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import CardsList from "./cards-list.jsx";
import {offersAll} from "../mocks";
import history from "../../history";

it(`Render CardsList Main`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <CardsList
            className={`cities__places-list tabs__content`}
            offers={offersAll}
            onCardTitleClick={() => {}}
            onCardHover={() => {}}
            onFavoriteButtonClick={() => {}}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render CardsList Property`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <CardsList
            className={`near-places__list`}
            offers={offersAll}
            onCardTitleClick={() => {}}
            onCardHover={() => {}}
            onFavoriteButtonClick={() => {}}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
