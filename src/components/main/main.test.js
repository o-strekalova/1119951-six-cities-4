import Main from "./main.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {offersAll} from "../mocks";
import {SortType} from "../../utils";

it(`Render Main`, () => {
  const tree = renderer
    .create(
        <Main
          offersAll={offersAll}
          activeCity={`Amsterdame`}
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
