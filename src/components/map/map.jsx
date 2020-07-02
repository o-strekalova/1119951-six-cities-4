import PropTypes from "prop-types";
import React, {PureComponent, createRef} from "react";
import leaflet from "leaflet";

const ZOOM = 12;
const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [30, 30]
});

export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._map = null;
  }

  componentDidMount() {
    const {city, cityOffers} = this.props;

    this._map = leaflet.map(this._mapRef.current, {
      center: city,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    this._map.setView(city, ZOOM);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    cityOffers.map((offer) => {
      return leaflet
        .marker(offer.coords, {ICON})
        .addTo(this._map);
    });
  }

  render() {
    return (
      <div
        id="map"
        ref={this._mapRef}
        style={{height: 100 + `%`}}
      />
    );
  }
}

Map.propTypes = {
  city: PropTypes.array.isRequired,
  cityOffers: PropTypes.array.isRequired,
};
