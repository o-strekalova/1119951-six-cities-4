import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import * as Enzyme from "enzyme";
import {Router} from "react-router-dom";
import FavoritesList from "./favorites-list";
import {offersAll, authInfo} from "../mocks";
import {AuthorizationStatus, noop} from "../../utils";
import history from "../../history";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Press card title in Favorite`, () => {
  const onCardTitleClick = jest.fn();

  const main = Enzyme.mount(
      <Router
        history={history}
      >
        <FavoritesList
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          offers={offersAll}
          onCardTitleClick={onCardTitleClick}
          onCityClick={noop}
          onFavoriteButtonClick={noop}
        />
      </Router>
  );

  const cardTitles = main.find(`.place-card__name a`);
  cardTitles.forEach((it) => it.simulate(`click`));

  expect(onCardTitleClick).toHaveBeenCalledTimes(2);
});

it(`Press favorite button in Favorite`, () => {
  const onFavoriteButtonClick = jest.fn();

  const main = Enzyme.mount(
      <Router
        history={history}
      >
        <FavoritesList
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          offers={offersAll}
          onCardTitleClick={noop}
          onCityClick={noop}
          onFavoriteButtonClick={onFavoriteButtonClick}
        />
      </Router>
  );

  const favoriteButtons = main.find(`.place-card__bookmark-button`);
  favoriteButtons.forEach((it) => it.simulate(`click`));

  expect(onFavoriteButtonClick).toHaveBeenCalledTimes(2);
});

it(`Press city in Favorites`, () => {
  const onCityClick = jest.fn();

  const main = Enzyme.mount(
      <Router
        history={history}
      >
      <FavoritesList
        authInfo={authInfo}
        authorizationStatus={AuthorizationStatus.AUTH}
        errorMessage={null}
        offers={offersAll}
        onCardTitleClick={noop}
        onCityClick={onCityClick}
        onFavoriteButtonClick={noop}
      />
      </Router>
  );

  const cities = main.find(`.locations__item-link`);
  cities.forEach((it) => it.simulate(`click`));

  expect(onCityClick).toHaveBeenCalledTimes(2);
});
