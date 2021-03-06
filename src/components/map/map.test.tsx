import * as React from "react";
import * as renderer from "react-test-renderer";
import Map from "./map";
import {offersAll} from "../mocks";

it(`Render Map`, () => {
  const tree = renderer.create(
      <Map
        activePin={null}
        centerLat={52.38333}
        centerLong={4.9}
        zoom={13}
        offers={offersAll}
      />, {
        createNodeMock: () => {
          return document.createElement(`DIV`);
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
