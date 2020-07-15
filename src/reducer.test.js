import {reducer, ActionType, ActionCreator} from "./reducer";
import {offersAll} from "./components/mocks";
import {SortType} from "./utils";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer({
    activeOffer: null,
    activeSort: SortType.POPULAR,
    offersAll,
    offersByCity: offersAll[0].offers,
    activeCity: offersAll[0].city,
    sortedOffers: offersAll[0].offers,
  }, {})).toEqual({
    activeOffer: null,
    activeSort: SortType.POPULAR,
    offersAll,
    offersByCity: offersAll[0].offers,
    activeCity: offersAll[0].city,
    sortedOffers: offersAll[0].offers,
  });
});

it(`Reducer should get active offer`, () => {
  expect(reducer({
    activeOffer: null,
    activePin: null,
    activeSort: SortType.POPULAR,
    offersAll,
    offersByCity: offersAll[0].offers,
    activeCity: offersAll[0].city,
    sortedOffers: offersAll[0].offers,
  }, {
    type: ActionType.GET_ACTIVE_OFFER,
    activeOffer: offersAll[0].offers[0],
  })).toEqual({
    activeOffer: offersAll[0].offers[0],
    activePin: null,
    activeSort: SortType.POPULAR,
    offersAll,
    offersByCity: offersAll[0].offers,
    activeCity: offersAll[0].city,
    sortedOffers: offersAll[0].offers,
  });
});

it(`Reducer should get new offers by city`, () => {
  expect(reducer({
    activeOffer: null,
    activePin: null,
    activeSort: SortType.POPULAR,
    offersAll,
    offersByCity: offersAll[0].offers,
    activeCity: offersAll[0].city,
    sortedOffers: offersAll[0].offers,
  }, {
    type: ActionType.GET_OFFERS_BY_CITY,
    activeCity: offersAll[1].city,
  })).toEqual({
    activeOffer: null,
    activePin: null,
    activeSort: SortType.POPULAR,
    offersAll,
    offersByCity: offersAll[1].offers,
    activeCity: offersAll[1].city,
    sortedOffers: offersAll[0].offers,
  });
});

it(`Reducer should sort offers found by city`, () => {
  expect(reducer({
    activeOffer: null,
    activePin: null,
    activeSort: SortType.POPULAR,
    offersAll,
    offersByCity: offersAll[0].offers,
    activeCity: offersAll[0].city,
    sortedOffers: offersAll[0].offers,
  }, {
    type: ActionType.SORT_OFFERS,
    activeSort: SortType.TOP_RATED,
  })).toEqual({
    activeOffer: null,
    activePin: null,
    activeSort: SortType.TOP_RATED,
    offersAll,
    offersByCity: offersAll[0].offers,
    activeCity: offersAll[0].city,
    sortedOffers: offersAll[0].offers.sort((a, b) => b.rating - a.rating),
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for getting active offer returns correct action`, () => {
    expect(ActionCreator.getActiveOffer(offersAll[0].offers[0])).toEqual({
      type: ActionType.GET_ACTIVE_OFFER,
      activeOffer: offersAll[0].offers[0],
    });
  });

  it(`Action creator for getting offers for city returns correct action`, () => {
    expect(ActionCreator.getOffersByCity(offersAll[1].city)).toEqual({
      type: ActionType.GET_OFFERS_BY_CITY,
      activeCity: offersAll[1].city,
    });
  });

  it(`Action creator for sorting offers found by city returns correct action`, () => {
    expect(ActionCreator.sortOffers(SortType.TOP_RATED)).toEqual({
      type: ActionType.SORT_OFFERS,
      activeSort: SortType.TOP_RATED,
    });
  });
});
