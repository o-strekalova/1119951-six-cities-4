import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import ErrorMessage from "../error-message/error-message.jsx";
import Header from "../header/header.jsx";
import CardsList from "../cards-list/cards-list.jsx";
import {CardClass, getCitiesForList, findOffersByCity} from "../../utils";

class FavoritesList extends PureComponent {
  _renderOffersSection() {
    const {
      offers,
      onCardTitleClick,
      onFavoriteButtonClick,
    } = this.props;

    const cities = getCitiesForList(offers);

    if (offers.length > 0) {
      return (
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {cities.map((city) => {
              return (
                <li className="favorites__locations-items" key={city.name}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city.name}</span>
                      </a>
                    </div>
                  </div>

                  <div className="favorites__places">
                    <CardsList
                      cardClass={CardClass.FAVORITE}
                      offers={findOffersByCity(offers, city)}
                      onCardHover={() => {}}
                      onCardTitleClick={onCardTitleClick}
                      onFavoriteButtonClick={onFavoriteButtonClick}
                    />
                  </div>
                </li>);
            })}
          </ul>
        </section>
      );
    } else {
      return (
        <section className="favorites favorites--empty">
          <h1 className="visually-hidden">Favorites (empty)</h1>
          <div className="favorites__status-wrapper">
            <b className="favorites__status">Nothing yet saved.</b>
            <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
          </div>
        </section>
      );
    }
  }

  render() {
    const {
      authInfo,
      authorizationStatus,
      errorMessage,
      offers,
    } = this.props;

    const isEmpty = offers.length === 0;
    const pageClass = isEmpty ? ` page--favorites-empty` : ``;
    const mainClass = isEmpty ? ` page__main--favorites-empty` : ``;

    return (
      <div className={`page` + pageClass}>
        <Header
          authInfo={authInfo}
          authorizationStatus={authorizationStatus}
        />

        <main className={`page__main page__main--favorites` + mainClass}>
          <div className="page__favorites-container container">
            {this._renderOffersSection()}
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
        <ErrorMessage
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}

FavoritesList.propTypes = {
  authInfo: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    isSuper: PropTypes.bool,
    name: PropTypes.string,
  }),
  authorizationStatus: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  offers: PropTypes.arrayOf(PropTypes.shape({
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
  onCardTitleClick: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func,
};

export default FavoritesList;
