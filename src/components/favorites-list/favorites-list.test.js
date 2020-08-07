import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import FavoritesList from "./favorites-list.jsx";
import {offersAll, authInfo} from "../mocks";
import {AuthorizationStatus, noop} from "../../utils";
import history from "../../history";

it(`Render Favorites with offers`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <FavoritesList
            authInfo={authInfo}
            authorizationStatus={AuthorizationStatus.AUTH}
            errorMessage={null}
            offers={offersAll}
            onCardTitleClick={noop}
            onFavoriteButtonClick={noop}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Favorites without offers`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <FavoritesList
            authInfo={authInfo}
            authorizationStatus={AuthorizationStatus.AUTH}
            errorMessage={null}
            offers={[]}
            onCardTitleClick={noop}
            onFavoriteButtonClick={noop}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Favorites with ErrorMessage`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <FavoritesList
            authInfo={authInfo}
            authorizationStatus={AuthorizationStatus.AUTH}
            errorMessage={`Action failed`}
            offers={[]}
            onCardTitleClick={noop}
            onFavoriteButtonClick={noop}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
