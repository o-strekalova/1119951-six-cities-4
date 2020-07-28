import {createSelector} from "reselect";
import NameSpace from "../name-space";
import {SortType} from "../../utils";

const NAME_SPACE = NameSpace.DATA;

export const getOffersAll = (state) => {
  return state[NAME_SPACE].offersAll;
};

export const getActiveCity = (state) => {
  return state[NAME_SPACE].activeCity;
};

export const getActiveSort = (state) => {
  return state[NAME_SPACE].activeSort;
};

const getOffersByCity = createSelector(
    getOffersAll,
    getActiveCity,
    (offersAll, city) => {
      return offersAll.filter((offer) => {
        return offer.city.name === city.name;
      });
    }
);

export const getSortedOffers = createSelector(
    getOffersByCity,
    getActiveSort,
    (offersByCity, sort) => {
      let offers = offersByCity.slice();

      switch (sort) {
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

      return offers;
    }
);
