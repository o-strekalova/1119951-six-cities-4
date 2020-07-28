import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {offersAll} from "../mocks";
import {SortType} from "../../utils";
import {AuthorizationStatus} from "../../reducer/user/user";

const mockStore = configureStore([]);

it(`Render App for authorized user`, () => {
  const store = mockStore({
  });

  const tree = renderer
  .create(
      <Provider store={store}>
        <App
          login={`mail@mail.ru`}
          authorizationStatus={AuthorizationStatus.AUTH}
          activeCity={offersAll[0].city}
          activeOffer={null}
          activeSort={SortType.POPULAR}
          offersAll={offersAll}
          sortedOffers={offersAll}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
        />
      </Provider>, {
        createNodeMock: () => {
          return document.createElement(`DIV`);
        }
      })
  .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render App for not authorized user`, () => {
  const store = mockStore({
  });

  const tree = renderer
  .create(
      <Provider store={store}>
        <App
          login={``}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          activeCity={offersAll[0].city}
          activeOffer={null}
          activeSort={SortType.POPULAR}
          offersAll={offersAll}
          sortedOffers={offersAll}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
        />
      </Provider>, {
        createNodeMock: () => {
          return document.createElement(`DIV`);
        }
      })
  .toJSON();

  expect(tree).toMatchSnapshot();
});
