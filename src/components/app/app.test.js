import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {offersAll} from "../mocks";

const mockStore = configureStore([]);

it(`Render App`, () => {
  const store = mockStore({
  });

  const tree = renderer
  .create(
      <Provider store={store}>
        <App
          offersAll={offersAll}
          offers={offersAll[0].offers}
          city={offersAll[0].city}
          activeOffer={null}
          onCardTitleClick={() => {}}
          onCityClick={() => {}}
        />
      </Provider>, {
        createNodeMock: () => {
          return document.createElement(`DIV`);
        }
      })
  .toJSON();

  expect(tree).toMatchSnapshot();
});
