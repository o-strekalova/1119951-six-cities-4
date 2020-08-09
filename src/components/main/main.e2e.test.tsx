import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import * as Enzyme from "enzyme";
import {Router} from "react-router-dom";
import Main from "./main";
import {offersAll, authInfo} from "../mocks";
import {SortType, AuthorizationStatus, noop} from "../../utils";
import history from "../../history";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Press card title in Main`, () => {
  const onCardTitleClick = jest.fn();

  const main = Enzyme.mount(
      <Router
        history={history}
      >
        <Main
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          offersAll={offersAll}
          activeCity={offersAll[0].city}
          sortedOffers={offersAll}
          activeSort={SortType.POPULAR}
          onCardTitleClick={onCardTitleClick}
          onCityClick={noop}
          onSortClick={noop}
          onAuthFormSubmit={noop}
          onFavoriteButtonClick={noop}
          onUserNameClick={noop}
        />
      </Router>
  );

  const cardTitles = main.find(`.place-card__name a`);
  cardTitles.forEach((it) => it.simulate(`click`));

  expect(onCardTitleClick).toHaveBeenCalledTimes(2);
});

it(`Press city`, () => {
  const onCityClick = jest.fn();

  const main = Enzyme.mount(
      <Router
        history={history}
      >
        <Main
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          offersAll={offersAll}
          activeCity={offersAll[0].city}
          sortedOffers={offersAll}
          activeSort={SortType.POPULAR}
          onCardTitleClick={noop}
          onCityClick={onCityClick}
          onSortClick={noop}
          onAuthFormSubmit={noop}
          onFavoriteButtonClick={noop}
          onUserNameClick={noop}
        />
      </Router>
  );

  const cities = main.find(`li.locations__item`);
  cities.forEach((it) => it.simulate(`click`));

  expect(onCityClick).toHaveBeenCalledTimes(2);
});

it(`Press favorite button`, () => {
  const onFavoriteButtonClick = jest.fn();

  const main = Enzyme.mount(
      <Router
        history={history}
      >
        <Main
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          offersAll={offersAll}
          activeCity={offersAll[0].city}
          sortedOffers={offersAll}
          activeSort={SortType.POPULAR}
          onCardTitleClick={noop}
          onCityClick={noop}
          onSortClick={noop}
          onAuthFormSubmit={noop}
          onFavoriteButtonClick={onFavoriteButtonClick}
          onUserNameClick={noop}
        />
      </Router>
  );

  const favoriteButtons = main.find(`.place-card__bookmark-button`);
  favoriteButtons.forEach((it) => it.simulate(`click`));

  expect(onFavoriteButtonClick).toHaveBeenCalledTimes(2);
});
