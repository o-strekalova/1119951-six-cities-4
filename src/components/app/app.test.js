import App from "./app.jsx";
import React from "react";
import renderer from "react-test-renderer";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      placesCount={312}
      offersTitles={[`Wood and stone place`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
