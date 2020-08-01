import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form.jsx";

it(`Render Review`, () => {
  const tree = renderer
    .create(
        <ReviewForm
          id={`11`}
          onSubmit={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
