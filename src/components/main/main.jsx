import PropTypes from "prop-types";
import React from "react";
import CardsList from "../cards-list/cards-list.jsx";
import Map from "../map/map.jsx";
import {CardsListClass} from "../../utils";
import CitiesList from "../cities-list/cities-list.jsx";

const Main = (props) => {
  const {
    offersAll,
    city,
    offers,
    onCardTitleClick,
    onCityClick,
  } = props;

  const cities = offersAll.map((offer) => offer.city);

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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={cities}
              city={city}
              onCityClick={onCityClick}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cities.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <CardsList
                className={CardsListClass.MAIN}
                offers={offers}
                onCardTitleClick={onCardTitleClick}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  center={[52.38333, 4.9]}
                  offers={offers}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

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
  city: PropTypes.string.isRequired,
  onCardTitleClick: PropTypes.func,
  onCityClick: PropTypes.func,
};

export default Main;
