import Adapter from "enzyme-adapter-react-16";
import Enzyme, {mount} from "enzyme";
import React from "react";
import {Router} from "react-router-dom";
import Property from "./property.jsx";
import {offersAll, authInfo} from "../mocks";
import {AuthorizationStatus} from "../../reducer/user/user";
import history from "../../history";

Enzyme.configure({
  adapter: new Adapter(),
});

/* будет работать, когда будет подключена загрузка предложений рядом

it(`Press card title in Property`, () => {
  const onCardTitleClick = jest.fn();

  const property = mount(
      <Router
        history={history}
      >
        <Property
          offer={offersAll[0]}
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          isToggleChecked={offersAll[0].isFavorite}
          onCardTitleClick={onCardTitleClick}
          onReviewSubmit={() => {}}
          onFavoriteButtonClick={() => {}}
          onToggleClick={() => {}}
        />
      </Router>
  );

  const cardTitle = property.find(`h2.place-card__name`);
  cardTitle.simulate(`click`);

  expect(onCardTitleClick).toHaveBeenCalledTimes(1);
}); */

it(`Submit review form`, () => {
  const onReviewSubmit = jest.fn();

  const property = mount(
      <Router
        history={history}
      >
        <Property
          offer={offersAll[0]}
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          isToggleChecked={offersAll[0].isFavorite}
          onCardTitleClick={() => {}}
          onReviewSubmit={onReviewSubmit}
          onFavoriteButtonClick={() => {}}
          onToggleClick={() => {}}
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

  const property = mount(
      <Router
        history={history}
      >
        <Property
          offer={offersAll[0]}
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          isToggleChecked={offersAll[0].isFavorite}
          onCardTitleClick={() => {}}
          onReviewSubmit={() => {}}
          onFavoriteButtonClick={onFavoriteButtonClick}
          onToggleClick={onToggleClick}
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
