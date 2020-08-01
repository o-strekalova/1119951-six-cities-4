import React from "react";
import renderer from "react-test-renderer";
import Property from "./property.jsx";
import {offersAll} from "../mocks";
import {AuthorizationStatus} from "../../reducer/user/user";

it(`Render Property for authorized user`, () => {
  const tree = renderer
    .create(
        <Property
          offer={offersAll[0]}
          login={`mail@mail.ru`}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={null}
          onCardTitleClick={() => {}}
          onReviewSubmit={() => {}}
        />, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Property for unauthorized user`, () => {
  const tree = renderer
    .create(
        <Property
          offer={offersAll[0]}
          login={``}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          errorMessage={null}
          onCardTitleClick={() => {}}
          onReviewSubmit={() => {}}
        />, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Property with ErrorMessage`, () => {
  const tree = renderer
    .create(
        <Property
          offer={offersAll[0]}
          login={`mail@mail.ru`}
          authorizationStatus={AuthorizationStatus.AUTH}
          errorMessage={`Failed to post review`}
          onCardTitleClick={() => {}}
          onReviewSubmit={() => {}}
        />, {
          createNodeMock: () => {
            return document.createElement(`DIV`);
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
