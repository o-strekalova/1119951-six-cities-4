import {reducer, ActionType, ActionCreator} from "./reducer";
import {offersAll} from "./components/mocks";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer({
    offersAll,
    city: offersAll[0].city,
    offers: offersAll[0].offers,
    activeOffer: null,
  }, {})).toEqual({
    offersAll,
    city: offersAll[0].city,
    offers: offersAll[0].offers,
    activeOffer: null,
  });
});

it(`Reducer should change city`, () => {
  expect(reducer({
    offersAll,
    city: offersAll[0].city,
    offers: offersAll[0].offers,
    activeOffer: null,
  }, {
    type: ActionType.CHANGE_CITY,
    city: `Paris`,
  })).toEqual({
    offersAll,
    city: `Paris`,
    offers: offersAll[0].offers,
    activeOffer: null,
  });
});

it(`Reducer should get new offers for city`, () => {
  expect(reducer({
    offersAll,
    city: offersAll[0].city,
    offers: offersAll[0].offers,
    activeOffer: null,
  }, {
    type: ActionType.GET_OFFERS,
    city: offersAll[1].city,
  })).toEqual({
    offersAll,
    city: offersAll[1].city,
    offers: offersAll[1].offers,
    activeOffer: null,
  });
});

it(`Reducer should get active offer`, () => {
  expect(reducer({
    offersAll,
    city: offersAll[0].city,
    offers: offersAll[0].offers,
    activeOffer: null,
  }, {
    type: ActionType.GET_ACTIVE_OFFER,
    activeOffer: offersAll[0].offers[0],
  })).toEqual({
    offersAll,
    city: offersAll[0].city,
    offers: offersAll[0].offers,
    activeOffer: offersAll[0].offers[0],
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing city returns correct action`, () => {
    expect(ActionCreator.changeCity(`Paris`)).toEqual({
      type: ActionType.CHANGE_CITY,
      city: `Paris`,
    });
  });

  it(`Action creator for getting offers for city returns correct action`, () => {
    expect(ActionCreator.getOffers(offersAll[1].city)).toEqual({
      type: ActionType.GET_OFFERS,
      city: offersAll[1].city,
    });
  });

  it(`Action creator for getting active offer returns correct action`, () => {
    expect(ActionCreator.getActiveOffer(offersAll[0].offers[0])).toEqual({
      type: ActionType.GET_ACTIVE_OFFER,
      activeOffer: offersAll[0].offers[0],
    });
  });
});
