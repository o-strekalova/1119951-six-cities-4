import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {mount} from "enzyme";
import {Router} from "react-router-dom";
import FavoritesList from "./favorites-list.jsx";
import {offersAll, authInfo} from "../mocks";
import {AuthorizationStatus, noop} from "../../utils";
import history from "../../history";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Press card title in Favorite`, () => {
  const onCardTitleClick = jest.fn();

  const main = mount(
      <Router
        history={history}
      >
        <FavoritesList
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          offers={offersAll}
          onCardTitleClick={onCardTitleClick}
          onLogoClick={noop}
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

  const main = mount(
      <Router
        history={history}
      >
        <FavoritesList
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          offers={offersAll}
          onCardTitleClick={noop}
          onLogoClick={noop}
          onFavoriteButtonClick={onFavoriteButtonClick}
        />
      </Router>
  );

  const favoriteButtons = main.find(`.place-card__bookmark-button`);
  favoriteButtons.forEach((it) => it.simulate(`click`));

  expect(onFavoriteButtonClick).toHaveBeenCalledTimes(2);
});
