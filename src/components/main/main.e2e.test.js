import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";
import Enzyme, {mount} from "enzyme";
import React from "react";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Press title`, () => {
  const onCardTitleClick = jest.fn();

  const main = mount(
      <Main
        placesCount={312}
        offersTitles={[`Wood and stone place`]}
        onCardTitleClick={onCardTitleClick}
      />
  );

  const cardTitle = main.find(`h2.place-card__name`);
  cardTitle.simulate(`click`);

  expect(onCardTitleClick.mock.calls.length).toBe(1);
});
