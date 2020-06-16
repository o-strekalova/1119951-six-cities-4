import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const PLACES_COUNT = 312;
const OFFERS_TITLES = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];

ReactDOM.render(
    <App
      placesCount={PLACES_COUNT}
      offersTitles={OFFERS_TITLES}
    />,
    document.querySelector(`#root`)
);
