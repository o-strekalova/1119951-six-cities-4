import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Login from "./login";
import history from "../../history";
import {noop} from "../../utils";

it(`Login component render correctly`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <Login
          onSubmit={noop}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
