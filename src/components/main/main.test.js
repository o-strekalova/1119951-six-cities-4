import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Main from "./main.jsx";
import {offersAll, authInfo} from "../mocks";
import {SortType} from "../../utils";
import {AuthorizationStatus} from "../../reducer/user/user";
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
            onCardTitleClick={() => {}}
            onCityClick={() => {}}
            onSortClick={() => {}}
            onAuthFormSubmit={() => {}}
            onFavoriteButtonClick={() => {}}
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
            onCardTitleClick={() => {}}
            onCityClick={() => {}}
            onSortClick={() => {}}
            onAuthFormSubmit={() => {}}
            onFavoriteButtonClick={() => {}}
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
            authInfo={{}}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            errorMessage={null}
            offersAll={[]}
            activeCity={offersAll[0].city}
            sortedOffers={[]}
            activeSort={SortType.POPULAR}
            onCardTitleClick={() => {}}
            onCityClick={() => {}}
            onSortClick={() => {}}
            onAuthFormSubmit={() => {}}
            onFavoriteButtonClick={() => {}}
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
            authInfo={{}}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            errorMessage={`Failed to load offers`}
            offersAll={[]}
            activeCity={offersAll[0].city}
            sortedOffers={[]}
            activeSort={SortType.POPULAR}
            onCardTitleClick={() => {}}
            onCityClick={() => {}}
            onSortClick={() => {}}
            onAuthFormSubmit={() => {}}
            onFavoriteButtonClick={() => {}}
          />
        </Router>, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
