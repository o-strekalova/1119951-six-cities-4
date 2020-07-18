import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {mount} from "enzyme";
import Main from "./main.jsx";
import {offersAll} from "../mocks";
import {SortType} from "../../utils";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Press card title in Main`, () => {
  const onCardTitleClick = jest.fn();

  const main = mount(
      <Main
        offersAll={offersAll}
        activeCity={`Amsterdame`}
        sortedOffers={offersAll[0].offers}
        activeSort={SortType.POPULAR}
        onCardTitleClick={onCardTitleClick}
        onCityClick={() => {}}
        onSortClick={() => {}}
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
        activeCity={`Amsterdame`}
        sortedOffers={offersAll[0].offers}
        activeSort={SortType.POPULAR}
        onCardTitleClick={() => {}}
        onCityClick={onCityClick}
        onSortClick={() => {}}
      />
  );

  const cities = main.find(`li.locations__item`);
  cities.forEach((it) => it.simulate(`click`));

  expect(onCityClick).toHaveBeenCalledTimes(2);
});

it(`Press sorting option`, () => {
  const onSortClick = jest.fn();

  const main = mount(
      <Main
        offersAll={offersAll}
        activeCity={`Amsterdame`}
        sortedOffers={offersAll[0].offers}
        activeSort={SortType.POPULAR}
        onCardTitleClick={() => {}}
        onCityClick={() => {}}
        onSortClick={onSortClick}
      />
  );

  const sortingOptions = main.find(`li.places__option`);
  sortingOptions.forEach((it) => it.simulate(`click`));

  expect(onSortClick).toHaveBeenCalledTimes(4);
});
