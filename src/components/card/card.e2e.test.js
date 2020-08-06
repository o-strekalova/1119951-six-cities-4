import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Router} from "react-router-dom";
import Card from "./card.jsx";
import {offersAll} from "../mocks";
import history from "../../history";
import {CardClass, AuthorizationStatus, noop} from "../../utils";

configure({adapter: new Adapter()});

const offer = offersAll[0];

it(`Mouseover on offer card should pass active offer to the callback`, () => {
  const onCardHover = jest.fn();

  const card = mount(
      <Router
        history={history}
      >
        <Card
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          key={offer.title + offer.id}
          cardClass={CardClass.MAIN}
          isToggleChecked={offer.isFavorite}
          offer={offer}
          onCardTitleClick={noop}
          onCardHover={onCardHover}
          onFavoriteButtonClick={noop}
          onToggleClick={noop}
        />
      </Router>);

  card.simulate(`mouseOver`);

  expect(onCardHover.mock.calls[0][0]).toMatchObject(offer);
});

it(`Click on offer card title should pass active offer to the callback`, () => {
  const onCardTitleClick = jest.fn();

  const card = mount(
      <Router
        history={history}
      >
        <Card
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          key={offer.title + offer.id}
          cardClass={CardClass.PROPERTY}
          isToggleChecked={offer.isFavorite}
          offer={offer}
          onCardTitleClick={onCardTitleClick}
          onCardHover={noop}
          onFavoriteButtonClick={noop}
          onToggleClick={noop}
        />
      </Router>);

  const cardTitle = card.find(`.place-card__name a`);
  cardTitle.simulate(`click`);

  expect(onCardTitleClick).toHaveBeenCalledTimes(1);
  expect(onCardTitleClick.mock.calls[0][0]).toMatchObject(offer);
});

it(`Click on favorite icon should pass status and id to the callback`, () => {
  const onFavoriteButtonClick = jest.fn();
  const onToggleClick = jest.fn();

  const card = mount(
      <Router
        history={history}
      >
        <Card
          authorizationStatus={AuthorizationStatus.AUTH}
          key={offer.title + offer.id}
          cardClass={CardClass.FAVORITE}
          isToggleChecked={offer.isFavorite}
          offer={offer}
          onCardTitleClick={noop}
          onCardHover={noop}
          onFavoriteButtonClick={onFavoriteButtonClick}
          onToggleClick={onToggleClick}
        />
      </Router>);

  const favoriteButton = card.find(`.place-card__bookmark-button`);
  favoriteButton.simulate(`click`);

  expect(onFavoriteButtonClick).toHaveBeenCalledTimes(1);
  expect(onFavoriteButtonClick.mock.calls[0][0]).toMatch(`1`);
  expect(onFavoriteButtonClick.mock.calls[0][1]).toMatch(offer.id);
  expect(onToggleClick).toHaveBeenCalledTimes(1);
});
