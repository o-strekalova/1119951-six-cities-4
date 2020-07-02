import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import leaflet from "leaflet";

const ZOOM = 12;
const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

export default class Map extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {city, cityOffers} = this.props;

    const map = leaflet.map(`map`, {
      center: city,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    map.setView(city, ZOOM);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    cityOffers.map((offer) => {
      return leaflet
        .marker(offer.coords, {ICON})
        .addTo(map);
    });
  }

  render() {
    return (
      <div
        id="map"
        style={{height: 100 + `%`}}
      />
    );
  }
}

Map.propTypes = {
  city: PropTypes.array.isRequired,
  cityOffers: PropTypes.array.isRequired,
};
