import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import CitiesList from "./cities-list";
import {offersAll} from "../mocks";

configure({adapter: new Adapter()});

it(`Click on city name should pass active city to the callback`, () => {
  const onCityClick = jest.fn();
  const onActiveItemChange = jest.fn();

  const list = mount(
      <CitiesList
        activeItem={offersAll[0].city}
        cities={[offersAll[0].city, offersAll[1].city]}
        onCityClick={onCityClick}
        onActiveItemChange={onActiveItemChange}
      />);

  const cities = list.find(`li.locations__item`);
  cities.forEach((it) => it.simulate(`click`));

  expect(onCityClick).toHaveBeenCalledTimes(2);
  expect(onCityClick.mock.calls[1][0]).toMatchObject(offersAll[1].city);
});
