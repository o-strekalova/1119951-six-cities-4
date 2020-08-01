import React from "react";
import renderer from "react-test-renderer";
import ErrorMessage from "./error-message.jsx";

it(`Render with ErrorMessage`, () => {
  const tree = renderer
    .create(
        <ErrorMessage
          errorMessage={`Faild to complete action`}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render without ErrorMessage`, () => {
  const tree = renderer
    .create(
        <ErrorMessage
          errorMessage={null}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
