import App from "./components/app/app.jsx";
import React from "react";
import ReactDOM from "react-dom";
import {offers} from "./mocks/offers";
import {reviews} from "./mocks/reviews";

const PLACES_COUNT = 312;

ReactDOM.render(
    <App
      placesCount={PLACES_COUNT}
      offers={offers}
      reviews={reviews}
    />,
    document.querySelector(`#root`)
);
