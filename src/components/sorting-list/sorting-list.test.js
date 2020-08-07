import React from "react";
import renderer from "react-test-renderer";
import SortingList from "./sorting-list.jsx";
import {SortType, noop} from "../../utils";

it(`Render Sorting List open`, () => {
  const tree = renderer
    .create(
        <SortingList
          activeSort={SortType.POPULAR}
          isToggleChecked={true}
          onSortClick={noop}
          onToggleClick={noop}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Render Sorting List closed`, () => {
  const tree = renderer
    .create(
        <SortingList
          activeSort={SortType.POPULAR}
          isToggleChecked={false}
          onSortClick={noop}
          onToggleClick={noop}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
