import {extend} from "../../utils";

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
  }
};

export {
  reducer,
  ActionType,
  ActionCreator,
  Operation,
};
