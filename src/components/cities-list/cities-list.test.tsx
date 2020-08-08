import * as React from "react";
import * as renderer from "react-test-renderer";
import CitiesList from "./cities-list";
import {offersAll} from "../mocks";
import {noop} from "../../utils";

it(`Render CitiesList`, () => {
  const tree = renderer
    .create(
        <CitiesList
          activeItem={offersAll[0].city}
          cities={[offersAll[0].city, offersAll[1].city]}
          onCityClick={noop}
          onActiveItemChange={noop}
        />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
