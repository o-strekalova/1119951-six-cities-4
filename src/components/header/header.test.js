import React from "react";
import renderer from "react-test-renderer";
import Header from "./header.jsx";
import {AuthorizationStatus} from "../../reducer/user/user";

it(`Render Header for authorized user`, () => {
  const tree = renderer
    .create(
        <Header
          login={`mail@mail.ru`}
          authorizationStatus={AuthorizationStatus.AUTH}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Header for not authorized user`, () => {
  const tree = renderer
    .create(
        <Header
          login={``}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
