import {reducer, ActionCreator, ActionType, AuthorizationStatus} from "./user";

const authInfo = {
  avatar: `https://api.adorable.io/avatars/128`,
  email: `mail@mail.ru`,
  id: 23,
  isSuper: true,
  name: ``,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    authInfo: {},
    login: ``,
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });
});

it(`Reducer should change authInfo by a given value`, () => {
  expect(reducer({
    authInfo: {},
  }, {
    type: ActionType.CHANGE_AUTH_INFO,
    payload: authInfo,
  })).toEqual({
    authInfo,
  });
});

it(`Reducer should change login by a given value`, () => {
  expect(reducer({
    login: ``,
  }, {
    type: ActionType.CHANGE_LOGIN,
    payload: `mail@mail.ru`,
  })).toEqual({
    login: `mail@mail.ru`,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`Action creator for changing authInfo returns correct action`, () => {
    expect(ActionCreator.changeAuthInfo(authInfo)).toEqual({
      type: ActionType.CHANGE_AUTH_INFO,
      payload: authInfo,
    });
  });

  it(`Action creator for changing login returns correct action`, () => {
    expect(ActionCreator.changeLogin(`mail@mail.ru`)).toEqual({
      type: ActionType.CHANGE_LOGIN,
      payload: `mail@mail.ru`,
    });
  });
});
