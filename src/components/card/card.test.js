import Card from "./card.jsx";
import React from "react";
import renderer from "react-test-renderer";

it(`Render Card`, () => {
  const tree = renderer
    .create(<Card
      title={`Wood and stone place`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
