import Card from "../card/card.jsx";
import PropTypes from "prop-types";
import React from "react";

const CardsList = (props) => {

  const {offersTitles} = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersTitles.map((it) => {
        return (
          <Card
            key={it}
            title={it}
          />
        );
      })}
    </div>
  );
};

CardsList.propTypes = {
  offersTitles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CardsList;
