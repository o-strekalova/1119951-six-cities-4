import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Main from "./main";
import {offersAll, authInfo} from "../mocks";
import {SortType, AuthorizationStatus, noop} from "../../utils";
import history from "../../history";

it(`Render Main with offers`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Main
            authInfo={authInfo}
            authorizationStatus={AuthorizationStatus.AUTH}
            errorMessage={null}
            offersAll={offersAll}
            activeCity={offersAll[0].city}
            sortedOffers={offersAll}
            activeSort={SortType.POPULAR}
            onCardTitleClick={noop}
            onCityClick={noop}
            onSortClick={noop}
            onAuthFormSubmit={noop}
            onFavoriteButtonClick={noop}
            onUserNameClick={noop}
          />
        </Router>, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Main without offers`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Main
            authInfo={authInfo}
            authorizationStatus={AuthorizationStatus.AUTH}
            errorMessage={null}
            offersAll={[]}
            activeCity={offersAll[0].city}
            sortedOffers={[]}
            activeSort={SortType.POPULAR}
            onCardTitleClick={noop}
            onCityClick={noop}
            onSortClick={noop}
            onAuthFormSubmit={noop}
            onFavoriteButtonClick={noop}
            onUserNameClick={noop}
          />
        </Router>, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Main for unauthorized user`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Main
            authInfo={null}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            errorMessage={null}
            offersAll={[]}
            activeCity={offersAll[0].city}
            sortedOffers={[]}
            activeSort={SortType.POPULAR}
            onCardTitleClick={noop}
            onCityClick={noop}
            onSortClick={noop}
            onAuthFormSubmit={noop}
            onFavoriteButtonClick={noop}
            onUserNameClick={noop}
          />
        </Router>, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Main for with ErrorMessage`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Main
            authInfo={null}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            errorMessage={`Failed to load offers`}
            offersAll={[]}
            activeCity={offersAll[0].city}
            sortedOffers={[]}
            activeSort={SortType.POPULAR}
            onCardTitleClick={noop}
            onCityClick={noop}
            onSortClick={noop}
            onAuthFormSubmit={noop}
            onFavoriteButtonClick={noop}
            onUserNameClick={noop}
          />
        </Router>, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
