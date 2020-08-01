import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import Login from "./login.jsx";
import history from "../../history";

it(`Login component render correctly`, () => {
  const tree = renderer.create(
      <Router
        history={history}
      >
        <Login
          onSubmit={() => {}}
        />
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
