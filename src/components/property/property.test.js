import Property from "./property.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {offersAll} from "../mocks";

const offer = offersAll[0].offers[0];

it(`Render Property`, () => {
  const tree = renderer
    .create(<Property
      offer={offer}
      onCardTitleClick={() => {}}
    />, {
      createNodeMock: () => {
        return document.createElement(`DIV`);
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
