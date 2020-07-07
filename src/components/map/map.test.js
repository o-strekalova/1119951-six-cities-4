import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";
import {offersAll} from "../mocks";

it(`Render Map`, () => {
  const tree = renderer.create(
      <Map
        center={[52.38333, 4.9]}
        offers={offersAll[0].offers}
      />, {
        createNodeMock: () => {
          return document.createElement(`DIV`);
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
