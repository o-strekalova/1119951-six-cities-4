import React from "react";
import renderer from "react-test-renderer";
import Property from "./property.jsx";
import {Router} from "react-router-dom";
import {offersAll, authInfo, reviews} from "../mocks";
import {AuthorizationStatus, noop} from "../../utils";
import history from "../../history";

it(`Render Property for authorized user`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Property
            authInfo={authInfo}
            authorizationStatus={AuthorizationStatus.AUTH}
            errorMessage={null}
            isToggleChecked={offersAll[0].isFavorite}
            offer={offersAll[0]}
            offersNear={offersAll}
            reviews={reviews}
            onCardTitleClick={noop}
            onFavoriteButtonClick={noop}
            onLogoClick={noop}
            onReviewSubmit={noop}
            onToggleClick={noop}
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

it(`Render Property for unauthorized user`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Property
            authInfo={{}}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            errorMessage={null}
            isToggleChecked={offersAll[0].isFavorite}
            offer={offersAll[0]}
            offersNear={offersAll}
            reviews={reviews}
            onCardTitleClick={noop}
            onFavoriteButtonClick={noop}
            onLogoClick={noop}
            onReviewSubmit={noop}
            onToggleClick={noop}
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

it(`Render Property with ErrorMessage`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Property
            authInfo={authInfo}
            authorizationStatus={AuthorizationStatus.AUTH}
            errorMessage={`Failed to post review`}
            isToggleChecked={offersAll[0].isFavorite}
            offer={offersAll[0]}
            offersNear={offersAll}
            reviews={reviews}
            onCardTitleClick={noop}
            onFavoriteButtonClick={noop}
            onLogoClick={noop}
            onReviewSubmit={noop}
            onToggleClick={noop}
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
