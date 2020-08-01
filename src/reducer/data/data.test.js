import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api";
import {reducer, ActionType, Operation, ActionCreator} from "./data";
import {offersAll, offersRaw} from "../../components/mocks";
import {SortType} from "../../utils";

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer({
    offersAll: [],
    activeSort: SortType.POPULAR,
    activeCity: {},
  }, {})).toEqual({
    offersAll: [],
    activeSort: SortType.POPULAR,
    activeCity: {},
  });
});

it(`Reducer should update offersAll and activeCity by load offersAll`, () => {
  expect(reducer({
    offersAll: [],
    activeCity: {},
  }, {
    type: ActionType.LOAD_OFFERS,
    offersAll,
    activeCity: offersAll[0].city,
  })).toEqual({
    offersAll,
    activeCity: offersAll[0].city,
  });
});

it(`Reducer should change activeCity`, () => {
  expect(reducer({
    activeCity: ``,
  }, {
    type: ActionType.CHANGE_ACTIVE_CITY,
    activeCity: offersAll[0].city,
  })).toEqual({
    activeCity: offersAll[0].city,
  });
});

it(`Reducer should change activeSort`, () => {
  expect(reducer({
    activeSort: SortType.POPULAR,
  }, {
    type: ActionType.CHANGE_ACTIVE_SORT,
    activeSort: SortType.TOP_RATED,
  })).toEqual({
    activeSort: SortType.TOP_RATED,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, offersRaw);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          offersAll,
          activeCity: offersAll[0].city,
        });
      });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for loading offers returns correct action`, () => {
    expect(ActionCreator.loadOffers(offersAll)).toEqual({
      type: ActionType.LOAD_OFFERS,
      offersAll,
      activeCity: offersAll[0].city,
    });
  });

  it(`Action creator for changing activeCity returns correct action`, () => {
    expect(ActionCreator.changeActiveCity(offersAll[1].city)).toEqual({
      type: ActionType.CHANGE_ACTIVE_CITY,
      activeCity: offersAll[1].city,
    });
  });

  it(`Action creator for sorting offers returns correct action`, () => {
    expect(ActionCreator.changeActiveSort(SortType.TOP_RATED)).toEqual({
      type: ActionType.CHANGE_ACTIVE_SORT,
      activeSort: SortType.TOP_RATED,
    });
  });
});
