import AuthInfo from "../../models/auth-info";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {},
  login: ``,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  CHANGE_AUTH_INFO: `CHANGE_AUTH_INFO`,
  CHANGE_LOGIN: `CHANGE_LOGIN`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  changeAuthInfo: (authInfo) => {
    return {
      type: ActionType.CHANGE_AUTH_INFO,
      payload: authInfo,
    };
  },

  changeLogin: (email) => {
    return {
      type: ActionType.CHANGE_LOGIN,
      payload: email,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });

    case ActionType.CHANGE_AUTH_INFO:
      return Object.assign({}, state, {
        authInfo: action.payload,
      });

    case ActionType.CHANGE_LOGIN:
      return Object.assign({}, state, {
        login: action.payload,
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
      .then((authInfo) => {
        dispatch(ActionCreator.changeLogin(authInfo.email));
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
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
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
