import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Login from "./login";
import history from "../../history";
import {noop} from "../../utils";

it(`Login component render correctly without Error`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <Login
          onSubmit={noop}
          errorMessage={null}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Login component render correctly with Error`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <Login
          onSubmit={noop}
          errorMessage={`Failed to complete action`}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
