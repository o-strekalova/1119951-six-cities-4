import Card from "../card/card.jsx";
import PropTypes from "prop-types";
import React from "react";

const CardsList = (props) => {

  const {offersTitles, onCardTitleClick} = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersTitles.map((it) => {
        return (
          <Card
            key={it}
            title={it}
            onCardTitleClick={onCardTitleClick}
          />
        );
      })}
    </div>
  );
};

CardsList.propTypes = {
  offersTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCardTitleClick: PropTypes.func,
};

export default CardsList;
