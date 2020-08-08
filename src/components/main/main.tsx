import * as React from "react";
import CitiesList from "../cities-list/cities-list";
import ErrorMessage from "../error-message/error-message";
import Header from "../header/header";
import MainEmpty from "../main-empty/main-empty";
import OffersSection from "../offers-section/offers-section";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {getCitiesForList} from "../../utils";
import {Offer, AuthInfo, City} from "../../types";

interface Props {
  activeCity: City | null,
  activeSort: string,
  authInfo: AuthInfo | null,
  authorizationStatus: string,
  errorMessage: string | null,
  offersAll: Array<Offer>,
  sortedOffers: Array<Offer>,
  onAuthFormSubmit: ({login, password}: {login: string; password: string}) => void,
  onCardTitleClick: (offer: Offer) => void,
  onCityClick: (city: City) => void,
  onFavoriteButtonClick: (newStatus: string, id: string) => void,
  onLogoClick: () => void,
  onSortClick: (sort: string) => void,
  onUserNameClick: () => void,
}

const OffersSectionWrapped = withActiveItem(OffersSection);
const CitiesListWrapped = withActiveItem(CitiesList);

class Main extends React.PureComponent<Props> {
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

export default Main;
