import React from "react";
import renderer from "react-test-renderer";
import OffersSection from "./offers-section.jsx";
import {offersAll} from "../mocks";
import {SortType} from "../../utils";

it(`Render OffersSection`, () => {
  const tree = renderer
    .create(
        <OffersSection
          activeCity={offersAll[0].city}
          activeItem={offersAll[0]}
          activeSort={SortType.POPULAR}
          className={`cities__places-list tabs__content`}
          offers={offersAll}
          onActiveItemChange={() => {}}
          onCardTitleClick={() => {}}
          onSortClick={() => {}}
        />, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
