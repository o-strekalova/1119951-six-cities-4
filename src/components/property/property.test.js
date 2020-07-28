import React from "react";
import renderer from "react-test-renderer";
import Property from "./property.jsx";
import {offersAll} from "../mocks";

it(`Render Property`, () => {
  const tree = renderer
    .create(
        <Property
          offer={offersAll[0]}
          onCardTitleClick={() => {}}
        />, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
