import PropTypes from "prop-types";
import React, {PureComponent, createRef} from "react";
import leaflet from "leaflet";

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
    this._centerLat = null;
    this._centerLong = null;
  }

  _renderMap() {
    const {
      activePin,
      centerLat,
      centerLong,
      zoom,
      offers,
    } = this.props;

    this._centerLat = centerLat;
    this._centerLong = centerLong;

    this._map = leaflet.map(this._mapRef.current, {
      center: [centerLat, centerLong],
      zoom,
      zoomControl: false,
      marker: true
    });

    this._map.setView([centerLat, centerLong], zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this._map);

    if (this._activeOffer) {
      leaflet
        .marker([activePin.location.lat, activePin.location.long], {icon: ACTIVE_ICON})
        .addTo(this._map);
    } else {
      offers.map((offer) => {
        leaflet
          .marker([offer.location.lat, offer.location.long], {icon: ICON})
          .addTo(this._map);
      });
    }
  }

  componentDidMount() {
    this._renderMap();
  }

  componentDidUpdate() {
    const {
      activePin,
      centerLat,
      centerLong,
    } = this.props;

    if (activePin !== this._activeOffer && activePin !== undefined) {

      if (this._activeOffer !== null) {
        this._activeMarker.remove();
      }

      this._activeOffer = activePin;

      this._activeMarker = leaflet
        .marker([this._activeOffer.location.lat, this._activeOffer.location.long], {icon: ACTIVE_ICON})
        .addTo(this._map);
    }

    if (this._centerLat !== centerLat && this._centerLong !== centerLong) {
      this._map.off();
      this._map.remove();

      this._activeOffer = null;
      this._activeMarker = {};

      this._renderMap();
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
  centerLat: PropTypes.number.isRequired,
  centerLong: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array.isRequired,
    preview: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        long: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
      name: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  })),
  activePin: PropTypes.shape({
    id: PropTypes.string.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string.isRequired),
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`apartment`, `room`, `house`, `hotel`]).isRequired,
    price: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    guests: PropTypes.number.isRequired,
    features: PropTypes.array.isRequired,
    preview: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    city: PropTypes.shape({
      location: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        long: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
      name: PropTypes.string.isRequired,
    }),
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }),
};
