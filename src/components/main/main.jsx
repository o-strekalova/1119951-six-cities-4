import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import CitiesList from "../cities-list/cities-list.jsx";
import Header from "../header/header.jsx";
import Login from "../login/login.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import OffersSection from "../offers-section/offers-section.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {AuthorizationStatus} from "../../reducer/user/user";
import {CardsListClass} from "../../utils";

const OffersSectionWrapped = withActiveItem(OffersSection);
const CitiesListWrapped = withActiveItem(CitiesList);

class Main extends PureComponent {
  _getCitiesForList() {
    const {offersAll} = this.props;

    const allCities = offersAll.map((offer) => offer.city);
    const allCitiesNames = allCities.map((city) => city.name);
    const uniqueCitiesNames = [...new Set(allCitiesNames)];
    const uniqueCities = [];

    for (let cityName of uniqueCitiesNames) {
      const cityForList = allCities.find((city) => cityName === city.name);
      uniqueCities.push(cityForList);
    }

    return uniqueCities;
  }

  _renderOffersSection() {
    const {
      activeCity,
      sortedOffers,
      activeSort,
      onSortClick,
      onCardTitleClick,
    } = this.props;

    if (sortedOffers.length > 0) {
      return (
        <OffersSectionWrapped
          activeCity={activeCity}
          activeSort={activeSort}
          className={CardsListClass.MAIN}
          offers={sortedOffers}
          onCardTitleClick={onCardTitleClick}
          onSortClick={onSortClick}
        />
      );
    } else {
      return (
        <MainEmpty
          activeCity={activeCity}
        />
      );
    }
  }

  _renderMain() {
    const {
      authorizationStatus,
      activeCity,
      sortedOffers,
      onAuthFormSubmit,
      onCityClick,
    } = this.props;

    const cities = this._getCitiesForList();
    const isEmpty = sortedOffers.length === 0 ? ` page__main--index-empty` : ``;

    switch (authorizationStatus) {
      case AuthorizationStatus.NO_AUTH:
        return (
          <Login
            onSubmit={onAuthFormSubmit}
          />
        );

      case AuthorizationStatus.AUTH:
        return (
          <main className={`page__main page__main--index` + isEmpty}>
            <h1 className="visually-hidden">Cities</h1>
            <div className="tabs">
              <section className="locations container">
                <CitiesListWrapped
                  activeItem={activeCity}
                  cities={cities}
                  onCityClick={onCityClick}
                />
              </section>
            </div>
            <div className="cities">
              {this._renderOffersSection()}
            </div>
          </main>
        );
    }

    return null;
  }

  render() {
    const {
      login,
      authorizationStatus,
    } = this.props;

    const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
    const pageClass = isAuthorized ? ` page--main` : ` page--login`;

    return (
      <div className={`page page--gray` + pageClass}>
        <Header
          login={login}
          authorizationStatus={authorizationStatus}
        />
        {this._renderMain()}
      </div>
    );
  }
}

Main.propTypes = {
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

export default Main;
