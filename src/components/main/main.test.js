import Main from "./main.jsx";
import React from "react";
import renderer from "react-test-renderer";

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      placesCount={312}
      offersTitles={[`Wood and stone place`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
