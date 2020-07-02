import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";
import {offers} from "../mocks";

it(`Render Map`, () => {
  const tree = renderer.create(
      <Map
        city={[52.38333, 4.9]}
        cityOffers={offers}
      />, {
        createNodeMock: () => {
          return document.createElement(`DIV`);
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
