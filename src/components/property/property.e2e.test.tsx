import * as Adapter from "enzyme-adapter-react-16";
import * as Enzyme from "enzyme";
import * as React from "react";
import {Router} from "react-router-dom";
import Property from "./property";
import {offersAll, authInfo, reviews} from "../mocks";
import {AuthorizationStatus, noop} from "../../utils";
import history from "../../history";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Press card title in Property`, () => {
  const onCardTitleClick = jest.fn();

  const property = Enzyme.mount(
      <Router
        history={history}
      >
        <Property
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          isToggleChecked={offersAll[0].isFavorite}
          offer={offersAll[0]}
          offersNear={offersAll}
          reviews={reviews}
          onCardTitleClick={onCardTitleClick}
          onFavoriteButtonClick={noop}
          onReviewSubmit={noop}
          onToggleClick={noop}
          onUserNameClick={noop}
        />
      </Router>
  );

  const cardTitles = property.find(`.place-card__name a`);
  cardTitles.forEach((it) => it.simulate(`click`));

  expect(onCardTitleClick).toHaveBeenCalledTimes(2);
});

it(`Submit review form`, () => {
  const onReviewSubmit = jest.fn();

  const property = Enzyme.mount(
      <Router
        history={history}
      >
        <Property
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          isToggleChecked={offersAll[0].isFavorite}
          offer={offersAll[0]}
          offersNear={offersAll}
          reviews={reviews}
          onCardTitleClick={noop}
          onFavoriteButtonClick={noop}
          onReviewSubmit={onReviewSubmit}
          onToggleClick={noop}
          onUserNameClick={noop}
        />
      </Router>
  );

  const reviewForm = property.find(`.reviews__form`);
  reviewForm.simulate(`submit`);

  expect(onReviewSubmit).toHaveBeenCalledTimes(1);
});

it(`Press favorite button in Property`, () => {
  const onFavoriteButtonClick = jest.fn();
  const onToggleClick = jest.fn();

  const property = Enzyme.mount(
      <Router
        history={history}
      >
        <Property
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          isToggleChecked={offersAll[0].isFavorite}
          offer={offersAll[0]}
          offersNear={offersAll}
          reviews={reviews}
          onCardTitleClick={noop}
          onFavoriteButtonClick={onFavoriteButtonClick}
          onReviewSubmit={noop}
          onToggleClick={onToggleClick}
          onUserNameClick={noop}
        />
      </Router>
  );

  const favoriteButton = property.find(`.property__bookmark-button`);
  favoriteButton.simulate(`click`);

  expect(onFavoriteButtonClick).toHaveBeenCalledTimes(1);
  expect(onFavoriteButtonClick.mock.calls[0][0]).toMatch(`1`);
  expect(onFavoriteButtonClick.mock.calls[0][1]).toMatch(offersAll[0].id);
  expect(onToggleClick).toHaveBeenCalledTimes(1);
});
