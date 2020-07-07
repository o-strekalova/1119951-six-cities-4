import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card.jsx";
import {offersAll} from "../mocks";

configure({adapter: new Adapter()});

const offer = offersAll[0].offers[0];

it(`Mouseover on offer card should pass active offer to the callback`, () => {
  const onCardHover = jest.fn();
  const onCardTitleClick = jest.fn();

  const card = shallow(
      <Card
        key={offer.title + offer.id}
        className={`cities__place-card`}
        offer={offer}
        onCardTitleClick={onCardTitleClick}
        onCardHover={onCardHover}
      />);

  card.simulate(`mouseOver`);

  expect(onCardHover.mock.calls[0][0]).toMatchObject(offer);
});

it(`Click on offer card title should pass active offer to the callback`, () => {
  const onCardHover = jest.fn();
  const onCardTitleClick = jest.fn();

  const card = shallow(
      <Card
        key={offer.title + offer.id}
        className={`cities__place-card`}
        offer={offer}
        onCardTitleClick={onCardTitleClick}
        onCardHover={onCardHover}
      />);

  const cardTitle = card.find(`h2.place-card__name`);
  cardTitle.simulate(`click`);

  expect(onCardTitleClick).toHaveBeenCalledTimes(1);
  expect(onCardTitleClick.mock.calls[0][0]).toMatchObject(offer);
});
