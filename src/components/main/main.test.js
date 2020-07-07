import Main from "./main.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {offersAll} from "../mocks";

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      offersAll={offersAll}
      city={`Amsterdame`}
      offers={offersAll[0].offers}
      onCardTitleClick={() => {}}
      onCityClick={() => {}}
    />, {
      createNodeMock: () => {
        return document.createElement(`DIV`);
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
