import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import CitiesList from "../cities-list/cities-list.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import OffersSection from "../offers-section/offers-section.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {CardsListClass} from "../../utils";

const OffersSectionWrapped = withActiveItem(OffersSection);
const CitiesListWrapped = withActiveItem(CitiesList);

class Main extends PureComponent {
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

  render() {
    const {
      activeCity,
      offersAll,
      sortedOffers,
      onCityClick,
    } = this.props;

    const cities = offersAll.map((offer) => offer.city);
    const isEmpty = sortedOffers.length === 0 ? ` page__main--index-empty` : ``;

    return (
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

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
      </div>
    );
  }
}

Main.propTypes = {
  offersAll: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
    offers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      coords: PropTypes.arrayOf(PropTypes.number.isRequired),
      pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
      price: PropTypes.number.isRequired,
      isPremium: PropTypes.bool.isRequired,
      rating: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      bedrooms: PropTypes.number.isRequired,
      guests: PropTypes.number.isRequired,
      features: PropTypes.array.isRequired,
      owner: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isSuper: PropTypes.bool.isRequired,
      }),
    })).isRequired,
  })).isRequired,
  sortedOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number.isRequired),
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  activeCity: PropTypes.string.isRequired,
  activeSort: PropTypes.string.isRequired,
  onCardTitleClick: PropTypes.func,
  onCityClick: PropTypes.func,
  onSortClick: PropTypes.func,
};

export default Main;
