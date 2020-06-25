import Card from "./card.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {offers} from "../mocks";

const offer = offers[0];

it(`Render Card`, () => {
  const tree = renderer
    .create(<Card
      key={offer.title + offer.id}
      offer={offer}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
