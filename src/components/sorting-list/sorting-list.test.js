import React from "react";
import renderer from "react-test-renderer";
import SortingList from "./sorting-list.jsx";
import {SortType} from "../../utils";

it(`Render Sorting List`, () => {
  const tree = renderer
    .create(
        <SortingList
          activeSort={SortType.POPULAR}
          onSortClick={() => {}}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
