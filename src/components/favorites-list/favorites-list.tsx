import * as React from "react";
import {Link} from "react-router-dom";
import ErrorMessage from "../error-message/error-message";
import Header from "../header/header";
import CardsList from "../cards-list/cards-list";
import {CardClass, getCitiesForList, findOffersByCity, AuthorizationStatus, noop, AppRoute} from "../../utils";
import {Offer, AuthInfo, City} from "../../types";

interface Props {
  authInfo: AuthInfo | null,
  authorizationStatus: string,
  errorMessage: string | null,
  offers: Array<Offer> |[],
  onCardTitleClick: (offer: Offer) => void,
  onCityClick: (city: City) => void,
  onFavoriteButtonClick: (newStatus: string, id: string) => void,
}

class FavoritesList extends React.PureComponent<Props> {
  renderOffersSection() {
    const {
      offers,
      onCardTitleClick,
      onFavoriteButtonClick,
      onCityClick,
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
                      <Link
                        className="locations__item-link"
                        onClick={() => onCityClick(city)}
                        to={AppRoute.MAIN}
                        >
                        <span>{city.name}</span>
                      </Link>
                    </div>
                  </div>

                  <div className="favorites__places">
                    <CardsList
                      authorizationStatus={AuthorizationStatus.AUTH}
                      cardClass={CardClass.FAVORITE}
                      offers={findOffersByCity(offers, city)}
                      onCardHover={noop}
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
          onUserNameClick={noop}
        />

        <main className={`page__main page__main--favorites` + mainClass}>
          <div className="page__favorites-container container">
            {this.renderOffersSection()}
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

export default FavoritesList;
