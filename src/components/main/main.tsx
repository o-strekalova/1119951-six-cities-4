import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import CitiesList from "../cities-list/cities-list.js";
import ErrorMessage from "../error-message/error-message.js";
import Header from "../header/header.js";
import MainEmpty from "../main-empty/main-empty.jsx";
import OffersSection from "../offers-section/offers-section.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {getCitiesForList} from "../../utils";

const OffersSectionWrapped = withActiveItem(OffersSection);
const CitiesListWrapped = withActiveItem(CitiesList);

class Main extends PureComponent {
  renderOffersSection() {
    const {
      activeCity,
      activeSort,
      authorizationStatus,
      sortedOffers,
      onSortClick,
      onCardTitleClick,
      onFavoriteButtonClick,
    } = this.props;

    if (sortedOffers.length > 0) {
      return (
        <OffersSectionWrapped
          activeCity={activeCity}
          activeSort={activeSort}
          authorizationStatus={authorizationStatus}
          offers={sortedOffers}
          onCardTitleClick={onCardTitleClick}
          onFavoriteButtonClick={onFavoriteButtonClick}
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

  render() {
    const {
      activeCity,
      authInfo,
      authorizationStatus,
      errorMessage,
      offersAll,
      sortedOffers,
      onCityClick,
      onLogoClick,
      onUserNameClick,
    } = this.props;

    const cities = getCitiesForList(offersAll);
    const isEmpty = sortedOffers.length === 0 ? ` page__main--index-empty` : ``;

    return (
      <div className={`page page--gray page--main`}>
        <Header
          authInfo={authInfo}
          authorizationStatus={authorizationStatus}
          onUserNameClick={onUserNameClick}
          onLogoClick={onLogoClick}
        />
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
            {this.renderOffersSection()}
          </div>
        </main>
        <ErrorMessage
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}

Main.propTypes = {
  activeCity: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
    name: PropTypes.string,
  }),
  activeSort: PropTypes.string.isRequired,
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
  onAuthFormSubmit: PropTypes.func,
  onCardTitleClick: PropTypes.func,
  onCityClick: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func,
  onLogoClick: PropTypes.func,
  onSortClick: PropTypes.func,
  onUserNameClick: PropTypes.func,
};

export default Main;
