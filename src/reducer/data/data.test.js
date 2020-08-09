import {reducer, ActionType, ActionCreator} from "./data";
import {offersAll, reviews} from "../../components/mocks";
import {SortType} from "../../utils";

describe(`Reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer({
      activeCity: {},
      activeSort: SortType.POPULAR,
      favoriteOffers: [],
      offersAll: [],
      offersNearby: [],
      reviews: [],
    }, {})).toEqual({
      activeCity: {},
      activeSort: SortType.POPULAR,
      favoriteOffers: [],
      offersAll: [],
      offersNearby: [],
      reviews: [],
    });
  });

  it(`Reducer should update offersAll by load`, () => {
    expect(reducer({
      offersAll: [],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: offersAll,
    })).toEqual({
      offersAll,
    });
  });

  it(`Reducer should change activeCity`, () => {
    expect(reducer({
      activeCity: ``,
    }, {
      type: ActionType.CHANGE_ACTIVE_CITY,
      payload: offersAll[0].city,
    })).toEqual({
      activeCity: offersAll[0].city,
    });
  });

  it(`Reducer should change activeSort`, () => {
    expect(reducer({
      activeSort: SortType.POPULAR,
    }, {
      type: ActionType.CHANGE_ACTIVE_SORT,
      payload: SortType.TOP_RATED,
    })).toEqual({
      activeSort: SortType.TOP_RATED,
    });
  });

  it(`Reducer should update favoriteOffers by load`, () => {
    expect(reducer({
      favoriteOffers: [],
    }, {
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: offersAll,
    })).toEqual({
      favoriteOffers: offersAll,
    });
  });

  it(`Reducer should update offersNearby by load`, () => {
    expect(reducer({
      offersNearby: [],
    }, {
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: offersAll,
    })).toEqual({
      offersNearby: offersAll,
    });
  });

  it(`Reducer should update reviews by load`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: offersAll,
    })).toEqual({
      reviews: offersAll,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for loading offers returns correct action`, () => {
    expect(ActionCreator.loadOffers(offersAll)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offersAll,
    });
  });

  it(`Action creator for changing activeCity returns correct action`, () => {
    expect(ActionCreator.changeActiveCity(offersAll[1].city)).toEqual({
      type: ActionType.CHANGE_ACTIVE_CITY,
      payload: offersAll[1].city,
    });
  });

  it(`Action creator for sorting offers returns correct action`, () => {
    expect(ActionCreator.changeActiveSort(SortType.TOP_RATED)).toEqual({
      type: ActionType.CHANGE_ACTIVE_SORT,
      payload: SortType.TOP_RATED,
    });
  });

  it(`Action creator for loading favorite offers returns correct action`, () => {
    expect(ActionCreator.loadFavoriteOffers(offersAll)).toEqual({
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: offersAll,
    });
  });

  it(`Action creator for loading offers nearby returns correct action`, () => {
    expect(ActionCreator.loadOffersNearby(offersAll)).toEqual({
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: offersAll,
    });
  });

  it(`Action creator for loading reviews returns correct action`, () => {
    expect(ActionCreator.loadReviews(reviews)).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    });
  });
});
