import {AppRoute, extend} from "../../utils";
import history from "../../history";

const initialState = {
  activeOffer: null,
  errorMessage: null,
};

const ActionType = {
  CHANGE_ACTIVE_OFFER: `CHANGE_ACTIVE_OFFER`,
  CHANGE_ERROR_MESSAGE: `CHANGE_ERROR_MESSAGE`,
};

const ActionCreator = {
  changeActiveOffer: (offer) => {
    return {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: offer,
    };
  },

  changeErrorMessage: (text) => {
    return {
      type: ActionType.CHANGE_ERROR_MESSAGE,
      payload: text,
    };
  },
};

const Operation = {
  postReview: (reviewData, id) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, {
      comment: reviewData.comment,
      rating: reviewData.rating,
    })
    .catch((err) => {
      dispatch(ActionCreator.changeErrorMessage(`Failed to post review. Try again later`));
      setTimeout(() => {
        dispatch(ActionCreator.changeErrorMessage(null));
      }, 5000);
      throw err;
    });
  },

  updateFavoriteStatus: (newStatus, id) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${newStatus}`, {
      id,
      newStatus,
    })
    .catch((err) => {
      if (err.response.status === 401) {
        history.push(AppRoute.LOGIN);
      } else {
        dispatch(ActionCreator.changeErrorMessage(`Failed to update favorite status. Try again later`));
        setTimeout(() => {
          dispatch(ActionCreator.changeErrorMessage(null));
        }, 5000);
      }
      throw err;
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_OFFER:

      return extend(state, {
        activeOffer: action.payload,
      });

    case ActionType.CHANGE_ERROR_MESSAGE:

      return extend(state, {
        errorMessage: action.payload,
      });
  }

  return state;
};

export {
  reducer,
  ActionType,
  ActionCreator,
  Operation,
};
