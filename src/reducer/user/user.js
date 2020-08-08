import AuthInfo from "../../models/auth-info";
import {ActionCreator as AppActionCreator} from "../app/app";
import {AuthorizationStatus} from "../../utils";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: null,
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
  CHANGE_AUTH_INFO: `CHANGE_AUTH_INFO`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: status,
    };
  },

  changeAuthInfo: (authInfo) => {
    return {
      type: ActionType.CHANGE_AUTH_INFO,
      payload: authInfo,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });

    case ActionType.CHANGE_AUTH_INFO:
      return Object.assign({}, state, {
        authInfo: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        return AuthInfo.parseAuthInfo(response.data);
      })
      .then((authInfo) => {
        dispatch(ActionCreator.changeAuthInfo(authInfo));
      })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
    .then(() => {
      dispatch(Operation.checkAuth());
    })
    .catch((err) => {
      dispatch(AppActionCreator.changeErrorMessage(`Failed to log in. Try again later`));
      setTimeout(() => {
        dispatch(AppActionCreator.changeErrorMessage(null));
      }, 5000);
      throw err;
    });
  },
};

export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
