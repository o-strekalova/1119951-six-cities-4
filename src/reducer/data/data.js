import {extend, SortType} from "../../utils";
import Offer from "../../models/offer";
import {ActionCreator as AppActionCreator} from "../app/app";

const initialState = {
  offersAll: [],
  activeCity: {},
  activeSort: SortType.POPULAR,
};

const ActionType = {
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
  CHANGE_ACTIVE_SORT: `CHANGE_ACTIVE_SORT`,
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offersAll) => {
    return {
      type: ActionType.LOAD_OFFERS,
      offersAll,
      activeCity: offersAll[0].city,
    };
  },

  changeActiveCity: (city) => {
    return {
      type: ActionType.CHANGE_ACTIVE_CITY,
      activeCity: city,
    };
  },

  changeActiveSort: (sort) => {
    return {
      type: ActionType.CHANGE_ACTIVE_SORT,
      activeSort: sort,
    };
  },
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        return Offer.parseOffers(response.data);
      })
      .then((offersAll) => {
        dispatch(ActionCreator.loadOffers(offersAll));
      })
      .catch((err) => {
        dispatch(AppActionCreator.changeErrorMessage(`Failed to load offers. Try again later`));
        setTimeout(() => {
          dispatch(AppActionCreator.changeErrorMessage(null));
        }, 5000);
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offersAll: action.offersAll,
        activeCity: action.activeCity,
      });

    case ActionType.CHANGE_ACTIVE_CITY:
      return extend(state, {
        activeCity: action.activeCity,
      });

    case ActionType.CHANGE_ACTIVE_SORT:
      return extend(state, {
        activeSort: action.activeSort,
      });
  }
  return state;
};

export {
  ActionType,
  ActionCreator,
  Operation,
  reducer,
};
