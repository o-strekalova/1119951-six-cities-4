import React from "react";
import renderer from "react-test-renderer";
import MainEmpty from "./main-empty.jsx";
import {offersAll} from "../mocks";

it(`Render MainEmpty`, () => {
  const tree = renderer
    .create(
        <MainEmpty
          activeCity={offersAll[0].city}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
