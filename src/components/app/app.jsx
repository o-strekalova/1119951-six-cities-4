import PropTypes from "prop-types";
import React from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import FavoritesList from "../favorites-list/favorites-list.jsx";
import Login from "../login/login.jsx";
import Main from "../main/main.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import Property from "../property/property.jsx";
import {ActionCreator as DataActionCreator, Operation as DataOperation} from "../../reducer/data/data";
import {getOffersAll, getActiveCity, getActiveSort, getSortedOffers, getFavoriteOffers, getOffersNearby, getReviews} from "../../reducer/data/selectors";
import {Operation as AppOperation, ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {getActiveOffer, getErrorMessage} from "../../reducer/app/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import {getAuthorizationStatus, getAuthInfo} from "../../reducer/user/selectors";
import withToggle from "../../hocs/with-toggle/with-toggle";
import {AppRoute, SortType, AuthorizationStatus} from "../../utils";
import history from "../../history";

const PropertyWrapped = withToggle(Property);
const getToggleValue = (offer) => offer === null ? false : offer.isFavorite;

const App = (props) => {
  const {
    activeCity,
    activeOffer,
    activeSort,
    authInfo,
    authorizationStatus,
    errorMessage,
    favoriteOffers,
    offersAll,
    offersNearby,
    reviews,
    sortedOffers,
    onAuthFormSubmit,
    onCardTitleClick,
    onCityClick,
    onFavoriteButtonClick,
    onReviewSubmit,
    onSortClick,
    onUserNameClick,
  } = props;

  return (
    <Router
      history={history}
    >
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <Main
            authInfo={authInfo}
            authorizationStatus={authorizationStatus}
            activeCity={activeCity}
            activeSort={activeSort}
            errorMessage={errorMessage}
            offersAll={offersAll}
            sortedOffers={sortedOffers}
            onAuthFormSubmit={onAuthFormSubmit}
            onCardTitleClick={onCardTitleClick}
            onCityClick={onCityClick}
            onFavoriteButtonClick={onFavoriteButtonClick}
            onSortClick={onSortClick}
            onUserNameClick={onUserNameClick}
          />
        </Route>
        <Route exact path={AppRoute.OFFER}>
          <PropertyWrapped
            authInfo={authInfo}
            authorizationStatus={authorizationStatus}
            isToggleChecked={getToggleValue(activeOffer)}
            offer={activeOffer}
            offersNear={offersNearby}
            reviews={reviews}
            onCardTitleClick={onCardTitleClick}
            onFavoriteButtonClick={onFavoriteButtonClick}
            onReviewSubmit={onReviewSubmit}
            onUserNameClick={onUserNameClick}
          />
        </Route>
        <Route
          exact
          path={AppRoute.LOGIN}
          render={() => {
            if (authorizationStatus === AuthorizationStatus.AUTH) {
              return history.push(AppRoute.MAIN);
            } else {
              return (
                <Login
                  onSubmit={onAuthFormSubmit}
                />
              );
            }
          }}>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => {
            return (
              <FavoritesList
                authInfo={authInfo}
                authorizationStatus={authorizationStatus}
                errorMessage={errorMessage}
                offers={favoriteOffers}
                onCardTitleClick={onCardTitleClick}
                onFavoriteButtonClick={onFavoriteButtonClick}
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  authInfo: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    isSuper: PropTypes.bool,
    name: PropTypes.string,
  }),
  activeCity: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
    name: PropTypes.string,
  }),
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
  activeSort: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  favoriteOffers: PropTypes.arrayOf(PropTypes.shape({
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
    }),
  })),
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
  offersNearby: PropTypes.arrayOf(PropTypes.shape({
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
  })),
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  })),
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
  onAuthFormSubmit: PropTypes.func,
  onCardTitleClick: PropTypes.func,
  onCityClick: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func,
  onReviewSubmit: PropTypes.func,
  onSortClick: PropTypes.func,
  onUserNameClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authInfo: getAuthInfo(state),
  authorizationStatus: getAuthorizationStatus(state),
  activeCity: getActiveCity(state),
  activeOffer: getActiveOffer(state),
  activeSort: getActiveSort(state),
  errorMessage: getErrorMessage(state),
  favoriteOffers: getFavoriteOffers(state),
  offersAll: getOffersAll(state),
  offersNearby: getOffersNearby(state),
  reviews: getReviews(state),
  sortedOffers: getSortedOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAuthFormSubmit(authData) {
    dispatch(UserOperation.login(authData));
  },
  onCardTitleClick(offer) {
    dispatch(AppActionCreator.changeActiveOffer(offer));
    dispatch(DataOperation.loadReviews(offer.id));
    dispatch(DataOperation.loadOffersNearby(offer.id));
  },
  onCityClick(city) {
    dispatch(DataActionCreator.changeActiveCity(city));
    dispatch(DataActionCreator.changeActiveSort(SortType.POPULAR));
  },
  onFavoriteButtonClick(newStatus, id) {
    dispatch(AppOperation.updateFavoriteStatus(newStatus, id));
  },
  onReviewSubmit(reviewData, id) {
    dispatch(AppOperation.postReview(reviewData, id));
  },
  onSortClick(sort) {
    dispatch(DataActionCreator.changeActiveSort(sort));
  },
  onUserNameClick() {
    dispatch(DataOperation.loadFavoriteOffers());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
