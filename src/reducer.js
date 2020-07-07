import {extend} from "./utils";
import {offersAll} from "./mocks/offers";

const initialState = {
  offersAll,
  city: offersAll[0].city,
  offers: offersAll[0].offers,
  activeOffer: null,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
  GET_ACTIVE_OFFER: `GET_ACTIVE_OFFER`,
};

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      city,
    };
  },

  getOffers: (city) => {
    return {
      type: ActionType.GET_OFFERS,
      city,
    };
  },

  getActiveOffer: (offer) => {
    return {
      type: ActionType.GET_ACTIVE_OFFER,
      activeOffer: offer,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:

      return extend(state, {
        city: action.city,
      });

    case ActionType.GET_OFFERS:

      const cityOffers = state.offersAll.find((offer) => {
        return offer.city === action.city;
      });

      return extend(state, {
        city: action.city,
        offers: cityOffers.offers,
      });

    case ActionType.GET_ACTIVE_OFFER:

      return extend(state, {
        activeOffer: action.activeOffer,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
