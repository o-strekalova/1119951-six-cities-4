import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {offersAll} from "../mocks";
import {SortType} from "../../utils";

it(`Render Main with offers`, () => {
  const tree = renderer
    .create(
        <Main
          offersAll={offersAll}
          activeCity={`Amsterdam`}
          sortedOffers={offersAll[0].offers}
          activeSort={SortType.POPULAR}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
        />, {
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
        <Main
          offersAll={[]}
          activeCity={`Amsterdam`}
          sortedOffers={[]}
          activeSort={SortType.POPULAR}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
        />, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
