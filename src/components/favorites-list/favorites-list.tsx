import * as React from "react";
import ErrorMessage from "../error-message/error-message";
import Header from "../header/header";
import CardsList from "../cards-list/cards-list";
import {CardClass, getCitiesForList, findOffersByCity, AuthorizationStatus, noop} from "../../utils";
import {Offer, AuthInfo} from "../../types";

interface Props {
  authInfo: AuthInfo | null,
  authorizationStatus: string,
  errorMessage: string | null,
  offers: Array<Offer> |[],
  onCardTitleClick: (offer: Offer) => void,
  onFavoriteButtonClick: (newStatus: string, id: string) => void,
  onLogoClick: () => void,
}

class FavoritesList extends React.PureComponent<Props> {
  renderOffersSection() {
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
      onLogoClick,
    } = this.props;

    const isEmpty = offers.length === 0;
    const pageClass = isEmpty ? ` page--favorites-empty` : ``;
    const mainClass = isEmpty ? ` page__main--favorites-empty` : ``;

    return (
      <div className={`page` + pageClass}>
        <Header
          authInfo={authInfo}
          authorizationStatus={authorizationStatus}
          onLogoClick={onLogoClick}
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
