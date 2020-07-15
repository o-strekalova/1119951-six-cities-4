import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SortingList from "./sorting-list.jsx";
import {SortType} from "../../utils";

configure({adapter: new Adapter()});

it(`Click on sorting option should pass active sorting type to the callback`, () => {
  const onSortClick = jest.fn();

  const list = mount(
      <SortingList
        activeSort={SortType.POPULAR}
        onSortClick={onSortClick}
      />);

  const sortingOptions = list.find(`li.places__option`);
  sortingOptions.forEach((it) => it.simulate(`click`));

  expect(onSortClick).toHaveBeenCalledTimes(4);
  expect(onSortClick.mock.calls[1][0]).toMatch(SortType.PRICE_FROM_LOW);
});