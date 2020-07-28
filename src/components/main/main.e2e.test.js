import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {mount} from "enzyme";
import Main from "./main.jsx";
import {offersAll} from "../mocks";
import {SortType} from "../../utils";
import {AuthorizationStatus} from "../../reducer/user/user";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Press card title in Main`, () => {
  const onCardTitleClick = jest.fn();

  const main = mount(
      <Main
        login={`mail@mail.ru`}
        authorizationStatus={AuthorizationStatus.AUTH}
        offersAll={offersAll}
        activeCity={offersAll[0].city}
        sortedOffers={offersAll}
        activeSort={SortType.POPULAR}
        onCardTitleClick={onCardTitleClick}
        onCityClick={() => {}}
        onSortClick={() => {}}
        onAuthFormSubmit={() => {}}
      />
  );

  const cardTitles = main.find(`h2.place-card__name`);
  cardTitles.forEach((it) => it.simulate(`click`));

  expect(onCardTitleClick).toHaveBeenCalledTimes(2);
});

it(`Press city`, () => {
  const onCityClick = jest.fn();

  const main = mount(
      <Main
        login={`mail@mail.ru`}
        authorizationStatus={AuthorizationStatus.AUTH}
        offersAll={offersAll}
        activeCity={offersAll[0].city}
        sortedOffers={offersAll}
        activeSort={SortType.POPULAR}
        onCardTitleClick={() => {}}
        onCityClick={onCityClick}
        onSortClick={() => {}}
        onAuthFormSubmit={() => {}}
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
        login={`mail@mail.ru`}
        authorizationStatus={AuthorizationStatus.AUTH}
        offersAll={offersAll}
        activeCity={offersAll[0].city}
        sortedOffers={offersAll}
        activeSort={SortType.POPULAR}
        onCardTitleClick={() => {}}
        onCityClick={() => {}}
        onSortClick={onSortClick}
        onAuthFormSubmit={() => {}}
      />
  );

  const sortingOptions = main.find(`li.places__option`);
  sortingOptions.forEach((it) => it.simulate(`click`));

  expect(onSortClick).toHaveBeenCalledTimes(4);
});

it(`Submit login form`, () => {
  const onAuthFormSubmit = jest.fn();

  const main = mount(
      <Main
        login={``}
        authorizationStatus={AuthorizationStatus.NO_AUTH}
        offersAll={offersAll}
        activeCity={offersAll[0].city}
        sortedOffers={offersAll}
        activeSort={SortType.POPULAR}
        onCardTitleClick={() => {}}
        onCityClick={() => {}}
        onSortClick={() => {}}
        onAuthFormSubmit={onAuthFormSubmit}
      />
  );

  const authForm = main.find(`form.login__form`);
  authForm.simulate(`submit`);

  expect(onAuthFormSubmit).toHaveBeenCalledTimes(1);
});
