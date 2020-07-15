import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CitiesList from "./cities-list.jsx";

configure({adapter: new Adapter()});

it(`Click on city name should pass active city to the callback`, () => {
  const onCityClick = jest.fn();
  const onActiveItemChange = jest.fn();

  const list = mount(
      <CitiesList
        activeItem={`Amsterdam`}
        cities={[`Amsterdam`, `Paris`]}
        onCityClick={onCityClick}
        onActiveItemChange={onActiveItemChange}
      />);

  const cities = list.find(`li.locations__item`);
  cities.forEach((it) => it.simulate(`click`));

  expect(onCityClick).toHaveBeenCalledTimes(2);
  expect(onCityClick.mock.calls[1][0]).toMatch(`Paris`);
});
