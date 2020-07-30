import {reducer, ActionType, ActionCreator} from "./app";
import {offersAll} from "../../components/mocks";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer({
    activeOffer: null,
    errorMessage: null,
  }, {})).toEqual({
    activeOffer: null,
    errorMessage: null,
  });
});

it(`Reducer should change active offer`, () => {
  expect(reducer({
    activeOffer: null,
  }, {
    type: ActionType.CHANGE_ACTIVE_OFFER,
    payload: offersAll[0],
  })).toEqual({
    activeOffer: offersAll[0],
  });
});

it(`Reducer should change error message`, () => {
  expect(reducer({
    errorMessage: null,
  }, {
    type: ActionType.CHANGE_ERROR_MESSAGE,
    payload: `Failed to post review. Try again later`,
  })).toEqual({
    errorMessage: `Failed to post review. Try again later`,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing active offer returns correct action`, () => {
    expect(ActionCreator.changeActiveOffer(offersAll[0])).toEqual({
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: offersAll[0],
    });
  });

  it(`Action creator for changing error message returns correct action`, () => {
    expect(ActionCreator.changeErrorMessage(`Failed to post review. Try again later`)).toEqual({
      type: ActionType.CHANGE_ERROR_MESSAGE,
      payload: `Failed to post review. Try again later`,
    });
  });
});
