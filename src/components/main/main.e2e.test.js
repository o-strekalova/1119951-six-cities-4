import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {mount} from "enzyme";
import {Router} from "react-router-dom";
import Main from "./main.jsx";
import {offersAll, authInfo} from "../mocks";
import {SortType} from "../../utils";
import {AuthorizationStatus} from "../../reducer/user/user";
import history from "../../history";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Press card title in Main`, () => {
  const onCardTitleClick = jest.fn();

  const main = mount(
      <Router
        history={history}
      >
        <Main
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          offersAll={offersAll}
          activeCity={offersAll[0].city}
          sortedOffers={offersAll}
          activeSort={SortType.POPULAR}
          onCardTitleClick={onCardTitleClick}
          onCityClick={() => {}}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
          onFavoriteButtonClick={() => {}}
        />
      </Router>
  );

  const cardTitles = main.find(`.place-card__name a`);
  cardTitles.forEach((it) => it.simulate(`click`));

  expect(onCardTitleClick).toHaveBeenCalledTimes(2);
});

it(`Press city`, () => {
  const onCityClick = jest.fn();

  const main = mount(
      <Router
        history={history}
      >
        <Main
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          offersAll={offersAll}
          activeCity={offersAll[0].city}
          sortedOffers={offersAll}
          activeSort={SortType.POPULAR}
          onCardTitleClick={() => {}}
          onCityClick={onCityClick}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
          onFavoriteButtonClick={() => {}}
        />
      </Router>
  );

  const cities = main.find(`li.locations__item`);
  cities.forEach((it) => it.simulate(`click`));

  expect(onCityClick).toHaveBeenCalledTimes(2);
});

it(`Press sorting option`, () => {
  const onSortClick = jest.fn();

  const main = mount(
      <Router
        history={history}
      >
        <Main
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          offersAll={offersAll}
          activeCity={offersAll[0].city}
          sortedOffers={offersAll}
          activeSort={SortType.POPULAR}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={onSortClick}
          onAuthFormSubmit={() => {}}
          onFavoriteButtonClick={() => {}}
        />
      </Router>
  );

  const sortingOptions = main.find(`li.places__option`);
  sortingOptions.forEach((it) => it.simulate(`click`));

  expect(onSortClick).toHaveBeenCalledTimes(4);
});

it(`Press favorite button`, () => {
  const onFavoriteButtonClick = jest.fn();

  const main = mount(
      <Router
        history={history}
      >
        <Main
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          offersAll={offersAll}
          activeCity={offersAll[0].city}
          sortedOffers={offersAll}
          activeSort={SortType.POPULAR}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
          onFavoriteButtonClick={onFavoriteButtonClick}
        />
      </Router>
  );

  const favoriteButtons = main.find(`.place-card__bookmark-button`);
  favoriteButtons.forEach((it) => it.simulate(`click`));

  expect(onFavoriteButtonClick).toHaveBeenCalledTimes(2);
});
