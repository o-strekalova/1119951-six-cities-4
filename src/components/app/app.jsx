import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import React from "react";

const App = (props) => {
  const {placesCount, offersTitles} = props;

  return (
    <Main
      placesCount={placesCount}
      offersTitles={offersTitles}
    />
  );
};

App.propTypes = {
  placesCount: PropTypes.number.isRequired,
  offersTitles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
