import PropTypes from "prop-types";
import React from "react";
import CardsList from "../cards-list/cards-list.jsx";
import Map from "../map/map.jsx";
import SortingList from "../sorting-list/sorting-list.jsx";

const OffersSection = (props) => {
  const {
    activeCity,
    activeItem,
    activeSort,
    className,
    offers,
    onActiveItemChange,
    onCardTitleClick,
    onSortClick,
  } = props;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {activeCity}</b>
        <SortingList
          activeSort={activeSort}
          onSortClick={onSortClick}
        />
        <CardsList
          className={className}
          offers={offers}
          onCardHover={onActiveItemChange}
          onCardTitleClick={onCardTitleClick}
        />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            activePin={activeItem}
            center={[52.38333, 4.9]}
            offers={offers}
          />
        </section>
      </div>
    </div>
  );
};

OffersSection.propTypes = {
  activeCity: PropTypes.string.isRequired,
  activeItem: PropTypes.shape({
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
  }),
  activeSort: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
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
  }))
  .isRequired,
  onActiveItemChange: PropTypes.func,
  onCardTitleClick: PropTypes.func,
  onSortClick: PropTypes.func,
};

export default React.memo(OffersSection);
