import React from "react";
import renderer from "react-test-renderer";
import Login from "./login.jsx";

it(`Login component render correctly`, () => {
  const tree = renderer.create(
      <Login
        onSubmit={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
