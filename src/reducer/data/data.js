import {extend, SortType} from "../../utils";
import Offer from "../../models/offer";
import Review from "../../models/review";
import {ActionCreator as AppActionCreator} from "../app/app";
import {getActiveCity} from "../data/selectors";

const initialState = {
  activeCity: {},
  activeSort: SortType.POPULAR,
  favoriteOffers: [],
  offersAll: [],
  offersNearby: [],
  reviews: [],
};

const ActionType = {
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
  CHANGE_ACTIVE_SORT: `CHANGE_ACTIVE_SORT`,
  LOAD_FAVORITE_OFFERS: `LOAD_FAVORITE_OFFERS`,
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_OFFERS_NEARBY: `LOAD_OFFERS_NEARBY`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
};

const ActionCreator = {
  changeActiveCity: (city) => {
    return {
      type: ActionType.CHANGE_ACTIVE_CITY,
      payload: city,
    };
  },

  changeActiveSort: (sort) => {
    return {
      type: ActionType.CHANGE_ACTIVE_SORT,
      payload: sort,
    };
  },

  loadFavoriteOffers: (offers) => {
    return {
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: offers,
    };
  },

  loadOffers: (offersAll) => {
    return {
      type: ActionType.LOAD_OFFERS,
      payload: offersAll,
    };
  },

  loadOffersNearby: (offers) => {
    return {
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: offers,
    };
  },

  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
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
        const state = getState();
        if (Object.keys(getActiveCity(state)).length === 0) {
          dispatch(ActionCreator.changeActiveCity(offersAll[0].city));
        }
      })
      .catch((err) => {
        dispatch(AppActionCreator.changeErrorMessage(`Failed to load offers. Try again later`));
        setTimeout(() => {
          dispatch(AppActionCreator.changeErrorMessage(null));
        }, 5000);
        throw err;
      });
  },

  loadFavoriteOffers: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        return Offer.parseOffers(response.data);
      })
      .then((offers) => {
        dispatch(ActionCreator.loadFavoriteOffers(offers));
      })
      .catch((err) => {
        dispatch(AppActionCreator.changeErrorMessage(`Failed to load favorite offers. Try again later`));
        setTimeout(() => {
          dispatch(AppActionCreator.changeErrorMessage(null));
        }, 5000);
        throw err;
      });
  },

  loadOffersNearby: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`)
      .then((response) => {
        return Offer.parseOffers(response.data);
      })
      .then((offers) => {
        dispatch(ActionCreator.loadOffersNearby(offers));
      })
      .catch((err) => {
        dispatch(AppActionCreator.changeErrorMessage(`Failed to load offers nearby. Try again later`));
        setTimeout(() => {
          dispatch(AppActionCreator.changeErrorMessage(null));
        }, 5000);
        throw err;
      });
  },

  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        return Review.parseReviews(response.data);
      })
      .then((reviews) => {
        dispatch(ActionCreator.loadReviews(reviews));
      })
      .catch((err) => {
        dispatch(AppActionCreator.changeErrorMessage(`Failed to load reviews. Try again later`));
        setTimeout(() => {
          dispatch(AppActionCreator.changeErrorMessage(null));
        }, 5000);
        throw err;
      });
  },

  postReview: (reviewData, id) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, {
      comment: reviewData.comment,
      rating: reviewData.rating,
    })
    .then((response) => {
      return Review.parseReviews(response.data);
    })
    .then((reviews) => {
      dispatch(ActionCreator.loadReviews(reviews));
    })
    .catch((err) => {
      dispatch(AppActionCreator.changeErrorMessage(`Failed to post review. Try again later`));
      setTimeout(() => {
        dispatch(AppActionCreator.changeErrorMessage(null));
      }, 5000);
      throw err;
    });
  },

  updateFavoriteStatus: (newStatus, id) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${newStatus}`, {
      id,
      newStatus,
    })
    .then(() => {
      dispatch(Operation.loadFavoriteOffers());
      dispatch(Operation.loadOffers());
    })
    .catch((err) => {
      dispatch(AppActionCreator.changeErrorMessage(`Failed to update favorite status. Try again later`));
      setTimeout(() => {
        dispatch(AppActionCreator.changeErrorMessage(null));
      }, 5000);
      throw err;
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });

    case ActionType.CHANGE_ACTIVE_SORT:
      return extend(state, {
        activeSort: action.payload,
      });

    case ActionType.LOAD_FAVORITE_OFFERS:
      return extend(state, {
        favoriteOffers: action.payload,
      });

    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offersAll: action.payload,
      });

    case ActionType.LOAD_OFFERS_NEARBY:
      return extend(state, {
        offersNearby: action.payload,
      });

    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
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
