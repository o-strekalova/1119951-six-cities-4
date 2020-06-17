import CardsList from "./cards-list.jsx";
import React from "react";
import renderer from "react-test-renderer";

it(`Render CardsList`, () => {
  const tree = renderer
    .create(<CardsList
      offersTitles={[`Wood and stone place`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
