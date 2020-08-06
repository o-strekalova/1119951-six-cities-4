import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Header from "./header.jsx";
import {AuthorizationStatus, noop} from "../../utils";
import {authInfo} from "../mocks";
import history from "../../history";

it(`Render Header for authorized user`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Header
            authInfo={authInfo}
            authorizationStatus={AuthorizationStatus.AUTH}
            onLogoClick={noop}
            onUserNameClick={noop}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Header for not authorized user`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Header
            authInfo={{}}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            onLogoClick={noop}
            onUserNameClick={noop}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
