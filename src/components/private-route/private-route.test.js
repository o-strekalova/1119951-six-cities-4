import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import FavoritesList from "../favorites-list/favorites-list.jsx";
import PrivateRoute from "./private-route.jsx";
import {offersAll, authInfo} from "../mocks";
import {AppRoute, AuthorizationStatus, noop} from "../../utils";
import history from "../../history";

const mockStore = configureStore([]);

it(`Render PrivateRoute for authorized user`, () => {
  const store = mockStore({
    [`USER`]: {authorizationStatus: AuthorizationStatus.AUTH},
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <PrivateRoute
              exact
              path={AppRoute.FAVORITES}
              render={() => {
                return (
                  <FavoritesList
                    authInfo={authInfo}
                    authorizationStatus={AuthorizationStatus.AUTH}
                    errorMessage={null}
                    offers={offersAll}
                    onCardTitleClick={noop}
                    onFavoriteButtonClick={noop}
                  />
                );
              }}
            />
          </Router>
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render PrivateRoute for unauthorized user`, () => {
  const store = mockStore({
    [`USER`]: {authorizationStatus: AuthorizationStatus.NO_AUTH},
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router
            history={history}
          >
            <PrivateRoute
              exact
              path={AppRoute.FAVORITES}
              render={() => {
                return (
                  <FavoritesList
                    authInfo={{}}
                    authorizationStatus={AuthorizationStatus.NO_AUTH}
                    errorMessage={null}
                    offers={offersAll}
                    onCardTitleClick={noop}
                    onFavoriteButtonClick={noop}
                  />
                );
              }}
            />
          </Router>
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
