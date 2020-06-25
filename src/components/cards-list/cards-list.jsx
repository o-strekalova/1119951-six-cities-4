import Card from "../card/card.jsx";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";

class CardsList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: {},
    };
  }

  handleCardHover(offer) {
    if (offer !== this.state.activeOffer) {
      this.setState(() => ({
        activeOffer: offer,
      }));
    }
  }

  render() {
    const {offers, onCardTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => {
          return <Card
            key={offer.title + offer.id}
            offer={offer}
            onCardTitleClick={onCardTitleClick}
            onCardHover={() => {
              this.handleCardHover(offer);
            }}
          />;
        })}
      </div>
    );
  }
}

CardsList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]),
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string,
      isSuper: PropTypes.bool.isRequired,
    }),
  }))
  .isRequired,
  onCardTitleClick: PropTypes.func,
};

export default CardsList;
