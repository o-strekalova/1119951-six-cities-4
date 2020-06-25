import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card.jsx";
import {offers} from "../mocks";

configure({adapter: new Adapter()});

const offer = offers[0];

it(`Mouseover on offer card should pass active offer to the callback`, () => {
  const onCardHover = jest.fn();
  const onCardTitleClick = jest.fn();

  const card = shallow(
      <Card
        key={offer.title + offer.id}
        offer={offer}
        onCardTitleClick={onCardTitleClick}
        onCardHover={onCardHover}
      />);

  card.simulate(`mouseOver`);

  expect(onCardHover.mock.calls[0][0]).toMatchObject(offer);
});
