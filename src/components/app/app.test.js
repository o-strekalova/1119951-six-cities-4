import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {offersAll} from "../mocks";
import {SortType} from "../../utils";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
  });

  const tree = renderer
  .create(
      <Provider store={store}>
        <App
          activeCity={offersAll[0].city}
          activeOffer={null}
          activeSort={SortType.POPULAR}
          offersAll={offersAll}
          sortedOffers={offersAll[0].offers}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
          onSortClick={() => {}}
        />
      </Provider>, {
        createNodeMock: () => {
          return document.createElement(`DIV`);
        }
      })
  .toJSON();

  expect(tree).toMatchSnapshot();
});
