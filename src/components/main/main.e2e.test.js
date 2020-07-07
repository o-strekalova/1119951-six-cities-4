import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import Enzyme, {mount} from "enzyme";
import React from "react";
import {offersAll} from "../mocks";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Press title`, () => {
  const onCardTitleClick = jest.fn();

  const main = mount(
      <Main
        offersAll={offersAll}
        city={`Amsterdame`}
        offers={offersAll[0].offers}
        onCardTitleClick={onCardTitleClick}
        onCityClick={() => {}}
      />
  );

  const cardTitle = main.find(`h2.place-card__name`);
  cardTitle.simulate(`click`);

  expect(onCardTitleClick).toHaveBeenCalledTimes(1);
});

it(`Press city`, () => {
  const onCityClick = jest.fn();

  const main = mount(
      <Main
        offersAll={offersAll}
        city={`Amsterdame`}
        offers={offersAll[0].offers}
        onCardTitleClick={() => {}}
        onCityClick={onCityClick}
      />
  );

  const cities = main.find(`li.locations__item`);
  cities.forEach((it) => it.simulate(`click`));

  expect(onCityClick).toHaveBeenCalledTimes(2);
});
