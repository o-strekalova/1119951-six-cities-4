import Adapter from "enzyme-adapter-react-16";
import Enzyme, {mount} from "enzyme";
import React from "react";
import Property from "./property.jsx";
import {offersAll} from "../mocks";

const offer = offersAll[0].offers[0];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Press card title in Property`, () => {
  const onCardTitleClick = jest.fn();

  const property = mount(
      <Property
        offer={offer}
        onCardTitleClick={onCardTitleClick}
        onCardHover={() => {}}
      />
  );

  const cardTitle = property.find(`h2.place-card__name`);
  cardTitle.simulate(`click`);

  expect(onCardTitleClick).toHaveBeenCalledTimes(1);
});
