import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import Property from "../property/property.jsx";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {SortType} from "../../utils";
import {getActiveOffer} from "../../reducer/app/selectors";
import {getOffersAll, getActiveCity, getActiveSort, getSortedOffers} from "../../reducer/data/selectors";
import {getAuthorizationStatus, getLogin} from "../../reducer/user/selectors";
import {Operation as UserOperation, ActionCreator as UserActionCreator} from "../../reducer/user/user";

class App extends PureComponent {
  _renderApp() {
    const {
      login,
      authorizationStatus,
      activeCity,
      activeOffer,
      activeSort,
      offersAll,
      sortedOffers,
      onCardTitleClick,
      onCityClick,
      onSortClick,
      onAuthFormSubmit,
    } = this.props;

    if (!activeOffer) {
      return (
        <Main
          login={login}
          authorizationStatus={authorizationStatus}
          offersAll={offersAll}
          activeCity={activeCity}
          sortedOffers={sortedOffers}
          activeSort={activeSort}
          onCardTitleClick={onCardTitleClick}
          onCityClick={onCityClick}
          onSortClick={onSortClick}
          onAuthFormSubmit={onAuthFormSubmit}
        />
      );
    }

    if (activeOffer) {
      return (
        <Property
          offer={activeOffer}
          onCardTitleClick={onCardTitleClick}
          login={login}
          authorizationStatus={authorizationStatus}
        />
      );
    }

    return null;
  }

  render() {
    const {
      login,
      authorizationStatus,
      activeOffer,
      onCardTitleClick,
    } = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-property">
            <Property
              offer={activeOffer}
              onCardTitleClick={onCardTitleClick}
              login={login}
              authorizationStatus={authorizationStatus}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  offersAll: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array.isRequired,
    preview: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        long: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
      name: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
  sortedOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array.isRequired,
    preview: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        long: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
      name: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
  activeOffer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array.isRequired,
    preview: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        long: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
      name: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }),
  activeCity: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
    name: PropTypes.string.isRequired,
  }).isRequired,
  activeSort: PropTypes.string.isRequired,
  onCardTitleClick: PropTypes.func,
  onCityClick: PropTypes.func,
  onSortClick: PropTypes.func,
  onAuthFormSubmit: PropTypes.func,
};

const mapStateToProps = (state) => ({
  login: getLogin(state),
  authorizationStatus: getAuthorizationStatus(state),
  activeCity: getActiveCity(state),
  activeOffer: getActiveOffer(state),
  activeSort: getActiveSort(state),
  offersAll: getOffersAll(state),
  sortedOffers: getSortedOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAuthFormSubmit(authData) {
    dispatch(UserOperation.login(authData));
    dispatch(UserActionCreator.changeLogin(authData.login));
  },
  onCardTitleClick(offer) {
    dispatch(AppActionCreator.changeActiveOffer(offer));
  },
  onCityClick(city) {
    dispatch(DataActionCreator.changeActiveCity(city));
    dispatch(DataActionCreator.changeActiveSort(SortType.POPULAR));
    dispatch(getSortedOffers());
  },
  onSortClick(sort) {
    dispatch(DataActionCreator.changeActiveSort(sort));
    dispatch(getSortedOffers());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
