import * as React from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import FavoritesList from "../favorites-list/favorites-list";
import Login from "../login/login";
import Main from "../main/main";
import PrivateRoute from "../private-route/private-route";
import Property from "../property/property";
import {ActionCreator as DataActionCreator, Operation as DataOperation} from "../../reducer/data/data";
import {getOffersAll, getActiveCity, getActiveSort, getSortedOffers, getFavoriteOffers, getOffersNearby, getReviews} from "../../reducer/data/selectors";
import {ActionCreator as AppActionCreator} from "../../reducer/app/app";
import {getActiveOffer, getErrorMessage} from "../../reducer/app/selectors";
import {Operation as UserOperation} from "../../reducer/user/user";
import {getAuthorizationStatus, getAuthInfo} from "../../reducer/user/selectors";
import withToggle from "../../hocs/with-toggle/with-toggle";
import {AppRoute, SortType, AuthorizationStatus} from "../../utils";
import history from "../../history";
import {Offer, Review, AuthInfo, City} from "../../types";

interface Props {
  activeCity: City | null,
  activeOffer: Offer | null,
  activeSort: string,
  authInfo: AuthInfo | null,
  authorizationStatus: string,
  errorMessage: string | null,
  favoriteOffers: Array<Offer> | [],
  offersAll: Array<Offer> | [],
  offersNearby: Array<Offer> | [],
  reviews: Array<Review> | [],
  sortedOffers: Array<Offer> | [],
  onAuthFormSubmit: ({login, password}: {login: string; password: string}) => void,
  onCardTitleClick: (offer: Offer) => void,
  onCityClick: (city: City) => void,
  onFavoriteButtonClick: (newStatus: string, id: string) => void,
  onReviewSubmit: ({comment, rating}: {comment: string; rating: string}, id: string) => void,
  onSortClick: (sort: string) => void,
  onUserNameClick: () => void,
}

const PropertyWrapped = withToggle(Property);
const getToggleValue = (offer) => offer === null ? false : offer.isFavorite;

const App: React.FunctionComponent<Props> = (props: Props) => {
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

  console.log(offersAll);

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
            return (
              authorizationStatus === AuthorizationStatus.NO_AUTH
                ? <Login
                  onSubmit={onAuthFormSubmit}
                />
                : history.push(AppRoute.MAIN)
            );
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
                onCityClick={onCityClick}
                onFavoriteButtonClick={onFavoriteButtonClick}
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
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
    dispatch(DataOperation.updateFavoriteStatus(newStatus, id));
  },
  onReviewSubmit(reviewData, id) {
    dispatch(DataOperation.postReview(reviewData, id));
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
