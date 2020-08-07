import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import OffersSection from "./offers-section.jsx";
import {offersAll} from "../mocks";
import {SortType, AuthorizationStatus, noop} from "../../utils";
import history from "../../history";

it(`Render OffersSection`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <OffersSection
            authorizationStatus={AuthorizationStatus.AUTH}
            activeCity={offersAll[0].city}
            activeItem={offersAll[0]}
            activeSort={SortType.POPULAR}
            offers={offersAll}
            onActiveItemChange={noop}
            onCardTitleClick={noop}
            onSortClick={noop}
            onFavoriteButtonClick={noop}
          />
        </Router>, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
