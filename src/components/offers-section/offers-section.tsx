import * as React from "react";
import CardsList from "../cards-list/cards-list";
import Map from "../map/map";
import SortingList from "../sorting-list/sorting-list";
import withToggle from "../../hocs/with-toggle/with-toggle";
import {CardClass} from "../../utils";
import {Offer, City} from "../../types";

interface Props {
  activeCity: City,
  activeItem: Offer,
  activeSort: string,
  authorizationStatus: string,
  offers: Array<Offer>,
  onCardTitleClick: (offer: Offer) => void,
  onFavoriteButtonClick: (newStatus: string, id: string) => void,
  onSortClick: (sort: string) => void,
  onActiveItemChange: (offer: Offer) => void,
}

const SortingListWrapped = withToggle(SortingList);

const OffersSection: React.FC<Props> = (props: Props) => {
  const {
    activeCity,
    activeItem,
    activeSort,
    authorizationStatus,
    offers,
    onActiveItemChange,
    onCardTitleClick,
    onSortClick,
    onFavoriteButtonClick,
  } = props;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {activeCity.name}</b>
        <SortingListWrapped
          activeSort={activeSort}
          onSortClick={onSortClick}
          isToggleChecked={false}
        />
        <div className={`cities__places-list tabs__content places__list`}>
          <CardsList
            authorizationStatus={authorizationStatus}
            offers={offers}
            cardClass={CardClass.MAIN}
            onCardHover={onActiveItemChange}
            onCardTitleClick={onCardTitleClick}
            onFavoriteButtonClick={onFavoriteButtonClick}
          />
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            activePin={activeItem}
            centerLat={activeCity.location.lat}
            centerLong={activeCity.location.long}
            zoom={activeCity.location.zoom}
            offers={offers}
          />
        </section>
      </div>
    </div>
  );
};

export default React.memo(OffersSection);
