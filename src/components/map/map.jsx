import PropTypes from "prop-types";
import React, {PureComponent, createRef} from "react";
import leaflet from "leaflet";

const ZOOM = 12;
const ICON = leaflet.icon({
  iconUrl: `img/pin.svg`,
  iconSize: [27, 39]
});

const ACTIVE_ICON = leaflet.icon({
  iconUrl: `img/pin-active.svg`,
  iconSize: [27, 39]
});

export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
    this._map = null;
    this._activeOffer = null;
    this._activeMarker = {};
  }

  componentDidMount() {
    const {
      activePin,
      center,
      offers,
    } = this.props;

    this._map = leaflet.map(this._mapRef.current, {
      center,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    });

    this._map.setView(center, ZOOM);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    if (activePin) {
      leaflet
        .marker(activePin.coords, {icon: ACTIVE_ICON})
        .addTo(this._map);
    } else {
      offers.map((offer) => {
        leaflet
          .marker(offer.coords, {icon: ICON})
          .addTo(this._map);
      });
    }
  }

  componentDidUpdate() {
    const {
      activePin,
    } = this.props;

    if (activePin !== this._activeOffer) {

      if (this._activeOffer !== null) {
        this._activeMarker.remove();
      }

      this._activeOffer = activePin;

      this._activeMarker = leaflet
        .marker(this._activeOffer.coords, {icon: ACTIVE_ICON})
        .addTo(this._map);
    }
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
  center: PropTypes.arrayOf(PropTypes.number.isRequired),
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
  activePin: PropTypes.shape({
    id: PropTypes.number.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number.isRequired),
  }),
};
