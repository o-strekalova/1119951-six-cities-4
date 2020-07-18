import React from "react";
import renderer from "react-test-renderer";
import OffersSection from "./offers-section.jsx";
import {offersAll} from "../mocks";
import {SortType} from "../../utils";

it(`Render OffersSection`, () => {
  const tree = renderer
    .create(
        <OffersSection
          activeCity={`Amsterdam`}
          activeItem={offersAll[0].offers[0]}
          activeSort={SortType.POPULAR}
          className={`cities__places-list tabs__content`}
          offers={offersAll[0].offers}
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
