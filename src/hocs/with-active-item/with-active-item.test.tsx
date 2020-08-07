import React from "react";
import renderer from "react-test-renderer";
import withActiveItem from "./with-active-item";
import {offersAll} from "../../components/mocks";

const MockComponent = () => {
  return <div/>;
};

const MockComponentWrapped = withActiveItem(MockComponent);

it(`withActiveItem is rendered correctly for CitiesList`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      activeItem={offersAll[0].city}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});

it(`withActiveItem is rendered correctly for OffersSection`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      activeItem={offersAll[0]}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
