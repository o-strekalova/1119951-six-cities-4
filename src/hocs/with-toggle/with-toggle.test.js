import React from "react";
import renderer from "react-test-renderer";
import withToggle from "./with-toggle";
import {offersAll} from "../../components/mocks";

const MockComponent = () => {
  return <div/>;
};

const MockComponentWrapped = withToggle(MockComponent);

it(`withToggle is rendered correctly for Card`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      offer={offersAll[0]}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`withToggle is rendered correctly for Property`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      offer={offersAll[1]}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
