import PropTypes from "prop-types";
import React from "react";
import Card from "../card/card.jsx";
import withToggle from "../../hocs/with-toggle/with-toggle";

const CardWrapped = withToggle(Card);

const CardsList = (props) => {
  const {
    cardClass,
    offers,
    onCardHover,
    onCardTitleClick,
    onFavoriteButtonClick,
  } = props;

  return (
    <React.Fragment>
      {offers.map((offer) => {
        return <CardWrapped
          key={offer.title + offer.id}
          cardClass={cardClass}
          offer={offer}
          onCardTitleClick={onCardTitleClick}
          onCardHover={onCardHover}
          onFavoriteButtonClick={onFavoriteButtonClick}
        />;
      })}
    </React.Fragment>
  );
};

CardsList.propTypes = {
  cardClass: PropTypes.shape({
    articleClass: PropTypes.string.isRequired,
    imageClass: PropTypes.string.isRequired,
    infoClass: PropTypes.string.isRequired,
    imageWidth: PropTypes.string.isRequired,
    imageHeight: PropTypes.string.isRequired,
  }).isRequired,
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
    }),
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
  onCardHover: PropTypes.func,
  onCardTitleClick: PropTypes.func,
  onFavoriteButtonClick: PropTypes.func,
};

export default React.memo(CardsList);
