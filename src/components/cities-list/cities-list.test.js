import CitiesList from "./cities-list.jsx";
import React from "react";
import renderer from "react-test-renderer";

it(`Render CitiesList`, () => {
  const tree = renderer
    .create(<CitiesList
      activeItem={`Amsterdam`}
      cities={[`Amsterdam`]}
      onCityClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
