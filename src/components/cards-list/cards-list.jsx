import PropTypes from "prop-types";
import React from "react";
import Card from "../card/card.jsx";
import {CardsListClass, CardClass} from "../../utils";

const CardsList = (props) => {
  const {
    className,
    offers,
    onCardTitleClick,
    onCardHover,
  } = props;

  const cardClassName = className === CardsListClass.MAIN ? CardClass.MAIN : CardClass.PROPERTY;

  return (
    <div className={className + ` places__list`}>
      {offers.map((offer) => {
        return <Card
          key={offer.title + offer.id}
          className={cardClassName}
          offer={offer}
          onCardTitleClick={onCardTitleClick}
          onCardHover={onCardHover}
        />;
      })}
    </div>
  );
};

CardsList.propTypes = {
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
  onCardTitleClick: PropTypes.func,
  onCardHover: PropTypes.func,
};

export default CardsList;
