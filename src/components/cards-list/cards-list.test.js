import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import CardsList from "./cards-list.jsx";
import {offersAll} from "../mocks";
import history from "../../history";
import {CardClass} from "../../utils";

it(`Render CardsList Main`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <CardsList
            cardClass={CardClass.MAIN}
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
            cardClass={CardClass.PROPERTY}
            offers={offersAll}
            onCardTitleClick={() => {}}
            onCardHover={() => {}}
            onFavoriteButtonClick={() => {}}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render CardsList Favorites`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <CardsList
            cardClass={CardClass.FAVORITE}
            offers={offersAll}
            onCardTitleClick={() => {}}
            onCardHover={() => {}}
            onFavoriteButtonClick={() => {}}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
