import React from "react";
import renderer from "react-test-renderer";
import MainEmpty from "./main-empty.jsx";

it(`Render MainEmpty`, () => {
  const tree = renderer
    .create(
        <MainEmpty
          activeCity={`Amsterdam`}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
