import {reducer, ActionType, ActionCreator} from "./app";
import {offersAll} from "../../components/mocks";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer({
    activeOffer: null,
  }, {})).toEqual({
    activeOffer: null,
  });
});

it(`Reducer should get active offer`, () => {
  expect(reducer({
    activeOffer: null,
  }, {
    type: ActionType.CHANGE_ACTIVE_OFFER,
    activeOffer: offersAll[0],
  })).toEqual({
    activeOffer: offersAll[0],
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for getting active offer returns correct action`, () => {
    expect(ActionCreator.changeActiveOffer(offersAll[0])).toEqual({
      type: ActionType.CHANGE_ACTIVE_OFFER,
      activeOffer: offersAll[0],
    });
  });
});
