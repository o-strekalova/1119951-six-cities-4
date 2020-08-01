import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import OffersSection from "./offers-section.jsx";
import {offersAll} from "../mocks";
import {SortType} from "../../utils";
import history from "../../history";

it(`Render OffersSection`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <OffersSection
            activeCity={offersAll[0].city}
            activeItem={offersAll[0]}
            activeSort={SortType.POPULAR}
            className={`cities__places-list tabs__content`}
            offers={offersAll}
            onActiveItemChange={() => {}}
            onCardTitleClick={() => {}}
            onSortClick={() => {}}
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
