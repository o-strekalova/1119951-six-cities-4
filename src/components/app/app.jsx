import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import Login from "../login/login.jsx";
import Main from "../main/main.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import Property from "../property/property.jsx";
import {ActionCreator as DataActionCreator} from "../../reducer/data/data";
import {Operation as AppOperation, ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {getActiveOffer, getErrorMessage} from "../../reducer/app/selectors";
import {getOffersAll, getActiveCity, getActiveSort, getSortedOffers} from "../../reducer/data/selectors";
import {getAuthorizationStatus, getAuthInfo} from "../../reducer/user/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import withToggle from "../../hocs/with-toggle/with-toggle";
import {AppRoute, SortType} from "../../utils";
import history from "../../history";

const PropertyWrapped = withToggle(Property);

class App extends PureComponent {
  _renderApp() {
    const {
      authInfo,
      authorizationStatus,
      errorMessage,
      activeCity,
      activeOffer,
      activeSort,
      offersAll,
      sortedOffers,
      onCardTitleClick,
      onCityClick,
      onSortClick,
      onAuthFormSubmit,
      onFavoriteButtonClick,
    } = this.props;

    if (!activeOffer) {
      history.push(AppRoute.MAIN);

      return (
        <Main
          authInfo={authInfo}
          authorizationStatus={authorizationStatus}
          errorMessage={errorMessage}
          offersAll={offersAll}
          activeCity={activeCity}
          sortedOffers={sortedOffers}
          activeSort={activeSort}
          onCardTitleClick={onCardTitleClick}
          onCityClick={onCityClick}
          onSortClick={onSortClick}
          onAuthFormSubmit={onAuthFormSubmit}
          onFavoriteButtonClick={onFavoriteButtonClick}
        />
      );
    }

    return null;
  }

  render() {
    const {
      authInfo,
      authorizationStatus,
      activeOffer,
      onAuthFormSubmit,
      onCardTitleClick,
      onReviewSubmit,
      onFavoriteButtonClick,
    } = this.props;

    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.MAIN}>
            {this._renderApp()}
          </Route>
          <Route exact path={AppRoute.OFFER}>
            <PropertyWrapped
              authInfo={authInfo}
              authorizationStatus={authorizationStatus}
              offer={activeOffer}
              onCardTitleClick={onCardTitleClick}
              onFavoriteButtonClick={onFavoriteButtonClick}
              onReviewSubmit={onReviewSubmit}
            />
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <Login
              onSubmit={onAuthFormSubmit}
            />
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            render={() => {
              return (
                <div>FavoritesList</div>
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    isSuper: PropTypes.bool,
    name: PropTypes.string,
  }),
  errorMessage: PropTypes.string,
  offersAll: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
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
    id: PropTypes.string.isRequired,
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
    id: PropTypes.string.isRequired,
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
    name: PropTypes.string,
  }),
  activeSort: PropTypes.string.isRequired,
  onAuthFormSubmit: PropTypes.func,
  onCardTitleClick: PropTypes.func,
  onCityClick: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func,
  onReviewSubmit: PropTypes.func,
  onSortClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authInfo: getAuthInfo(state),
  authorizationStatus: getAuthorizationStatus(state),
  activeCity: getActiveCity(state),
  activeOffer: getActiveOffer(state),
  activeSort: getActiveSort(state),
  errorMessage: getErrorMessage(state),
  offersAll: getOffersAll(state),
  sortedOffers: getSortedOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAuthFormSubmit(authData) {
    dispatch(UserOperation.login(authData));
  },
  onCardTitleClick(offer) {
    dispatch(AppActionCreator.changeActiveOffer(offer));
  },
  onCityClick(city) {
    dispatch(DataActionCreator.changeActiveCity(city));
    dispatch(DataActionCreator.changeActiveSort(SortType.POPULAR));
    dispatch(getSortedOffers());
  },
  onFavoriteButtonClick(newStatus, id) {
    dispatch(AppOperation.updateFavoriteStatus(newStatus, id));
  },
  onReviewSubmit(reviewData, id) {
    dispatch(AppOperation.postReview(reviewData, id));
  },
  onSortClick(sort) {
    dispatch(DataActionCreator.changeActiveSort(sort));
    dispatch(getSortedOffers());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
