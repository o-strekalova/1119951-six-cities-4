import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import React from "react";

const App = (props) => {
  const {placesCount, offers} = props;

  return (
    <Main
      placesCount={placesCount}
      offers={offers}
      onCardTitleClick={() => {}}
    />
  );
};

App.propTypes = {
  placesCount: PropTypes.number.isRequired,
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
  .isRequired
};

export default App;
