import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {offersAll} from "../mocks";
import {SortType} from "../../utils";
import {AuthorizationStatus} from "../../reducer/user/user";

it(`Render Main with offers`, () => {
  const tree = renderer
    .create(
        <Main
          login={`mail@mail.ru`}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          offersAll={offersAll}
          activeCity={offersAll[0].city}
          sortedOffers={offersAll}
          activeSort={SortType.POPULAR}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
        />, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Main without offers`, () => {
  const tree = renderer
    .create(
        <Main
          login={`mail@mail.ru`}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          offersAll={[]}
          activeCity={offersAll[0].city}
          sortedOffers={[]}
          activeSort={SortType.POPULAR}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
        />, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Main for unauthorized user`, () => {
  const tree = renderer
    .create(
        <Main
          login={``}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          errorMessage={null}
          offersAll={[]}
          activeCity={offersAll[0].city}
          sortedOffers={[]}
          activeSort={SortType.POPULAR}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
        />, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Main for with ErrorMessage`, () => {
  const tree = renderer
    .create(
        <Main
          login={``}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          errorMessage={`Failed to load offers`}
          offersAll={[]}
          activeCity={offersAll[0].city}
          sortedOffers={[]}
          activeSort={SortType.POPULAR}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
        />, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
