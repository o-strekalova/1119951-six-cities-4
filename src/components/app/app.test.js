import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {offersAll, authInfo} from "../mocks";
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
          authInfo={authInfo}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          activeCity={offersAll[0].city}
          activeOffer={null}
          activeSort={SortType.POPULAR}
          offersAll={offersAll}
          sortedOffers={offersAll}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
          onReviewSubmit={() => {}}
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
          authInfo={{}}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          errorMessage={null}
          activeCity={offersAll[0].city}
          activeOffer={null}
          activeSort={SortType.POPULAR}
          offersAll={offersAll}
          sortedOffers={offersAll}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
          onReviewSubmit={() => {}}
        />
      </Provider>, {
        createNodeMock: () => {
          return document.createElement(`DIV`);
        }
      })
  .toJSON();

  expect(tree).toMatchSnapshot();
});


it(`Render App with error`, () => {
  const store = mockStore({
  });

  const tree = renderer
  .create(
      <Provider store={store}>
        <App
          authInfo={{}}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          errorMessage={`Failed to load offers`}
          activeCity={{}}
          activeOffer={null}
          activeSort={SortType.POPULAR}
          offersAll={[]}
          sortedOffers={[]}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
          onAuthFormSubmit={() => {}}
          onReviewSubmit={() => {}}
        />
      </Provider>, {
        createNodeMock: () => {
          return document.createElement(`DIV`);
        }
      })
  .toJSON();

  expect(tree).toMatchSnapshot();
});
