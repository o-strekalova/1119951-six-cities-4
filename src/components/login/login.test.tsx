import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Login from "./login.js";
import history from "../../history";
import {noop} from "../../utils";

it(`Login component render correctly`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <Login
          onLogoClick={noop}
          onSubmit={noop}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
