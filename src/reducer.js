import {extend, SortType} from "./utils";
import {offersAll} from "./mocks/offers";

const initialState = {
  activeOffer: null,
  activeCity: offersAll[0].city,
  activeSort: SortType.POPULAR,
  offersAll,
  offersByCity: offersAll[0].offers,
  sortedOffers: offersAll[0].offers,
};

const ActionType = {
  GET_OFFERS_BY_CITY: `GET_OFFERS_BY_CITY`,
  GET_ACTIVE_OFFER: `GET_ACTIVE_OFFER`,
  SORT_OFFERS: `SORT_OFFERS`,
};

const ActionCreator = {
  getActiveOffer: (offer) => {
    return {
      type: ActionType.GET_ACTIVE_OFFER,
      activeOffer: offer,
    };
  },

  getOffersByCity: (city) => {
    return {
      type: ActionType.GET_OFFERS_BY_CITY,
      activeCity: city,
    };
  },

  sortOffers: (sort) => {
    return {
      type: ActionType.SORT_OFFERS,
      activeSort: sort,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_OFFERS_BY_CITY:

      const cityOffers = state.offersAll.find((offer) => {
        return offer.city === action.activeCity;
      });

      return extend(state, {
        activeCity: action.activeCity,
        offersByCity: cityOffers.offers,
      });

    case ActionType.GET_ACTIVE_OFFER:

      return extend(state, {
        activeOffer: action.activeOffer,
      });

    case ActionType.SORT_OFFERS:
      let offers = state.offersByCity.slice();

      switch (action.activeSort) {
        case SortType.POPULAR:
          break;

        case SortType.PRICE_FROM_LOW:
          offers.sort((a, b) => a.price - b.price);
          break;

        case SortType.PRICE_FROM_HIGH:
          offers.sort((a, b) => b.price - a.price);
          break;

        case SortType.TOP_RATED:
          offers.sort((a, b) => b.rating - a.rating);
          break;
      }

      return extend(state, {
        activeSort: action.activeSort,
        sortedOffers: offers,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
