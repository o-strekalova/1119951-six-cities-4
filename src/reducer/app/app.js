import {extend} from "../../utils";

const initialState = {
  activeOffer: null,
};

const ActionType = {
  CHANGE_ACTIVE_OFFER: `CHANGE_ACTIVE_OFFER`,
};

const ActionCreator = {
  changeActiveOffer: (offer) => {
    return {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      activeOffer: offer,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_OFFER:

      return extend(state, {
        activeOffer: action.activeOffer,
      });
  }

  return state;
};

export {
  reducer,
  ActionType,
  ActionCreator
};
