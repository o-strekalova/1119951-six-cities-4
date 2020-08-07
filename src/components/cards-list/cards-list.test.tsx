import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import CardsList from "./cards-list.js";
import {offersAll} from "../mocks";
import history from "../../history";
import {CardClass, AuthorizationStatus, noop} from "../../utils";

it(`Render CardsList Main`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <CardsList
            authorizationStatus={AuthorizationStatus.AUTH}
            cardClass={CardClass.MAIN}
            offers={offersAll}
            onCardTitleClick={noop}
            onCardHover={noop}
            onFavoriteButtonClick={noop}
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
            authorizationStatus={AuthorizationStatus.AUTH}
            cardClass={CardClass.PROPERTY}
            offers={offersAll}
            onCardTitleClick={noop}
            onCardHover={noop}
            onFavoriteButtonClick={noop}
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
            authorizationStatus={AuthorizationStatus.AUTH}
            cardClass={CardClass.FAVORITE}
            offers={offersAll}
            onCardTitleClick={noop}
            onCardHover={noop}
            onFavoriteButtonClick={noop}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
