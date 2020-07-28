import React from "react";
import renderer from "react-test-renderer";
import Property from "./property.jsx";
import {offersAll} from "../mocks";
import {AuthorizationStatus} from "../../reducer/user/user";

it(`Render Property`, () => {
  const tree = renderer
    .create(
        <Property
          offer={offersAll[0]}
          onCardTitleClick={() => {}}
          login={`mail@mail.ru`}
          authorizationStatus={AuthorizationStatus.AUTH}
        />, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
