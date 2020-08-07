import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form.jsx";
import {noop} from "../../utils";

it(`Render Review`, () => {
  const tree = renderer
    .create(
        <ReviewForm
          id={`11`}
          onSubmit={noop}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
