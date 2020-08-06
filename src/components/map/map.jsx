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

    this.mapRef = createRef();
    this.map = null;
    this.activeOffer = null;
    this.activeMarker = {};
    this.centerLat = null;
    this.centerLong = null;
    this.offers = [];
  }

  componentDidMount() {
    this.renderMap();
  }

  componentDidUpdate() {
    const {
      activePin,
      centerLat,
      centerLong,
      offers,
    } = this.props;

    if (activePin !== this.activeOffer && activePin !== undefined) {

      if (this.activeOffer !== null) {
        this.activeMarker.remove();
      }

      this.activeOffer = activePin;

      this.activeMarker = leaflet
        .marker([this.activeOffer.location.lat, this.activeOffer.location.long], {icon: ACTIVE_ICON})
        .addTo(this.map);
    }

    if (this.centerLat !== centerLat && this.centerLong !== centerLong) {
      this.map.off();
      this.map.remove();

      this.activeOffer = null;
      this.activeMarker = {};

      this.renderMap();
    }

    if (offers !== this.offers) {
      this.offers = offers;

      this.offers.map((offer) => {
        leaflet
          .marker([offer.location.lat, offer.location.long], {icon: ICON})
          .addTo(this.map);
      });
    }
  }

  renderMap() {
    const {
      activePin,
      centerLat,
      centerLong,
      zoom,
      offers,
    } = this.props;

    this.centerLat = centerLat;
    this.centerLong = centerLong;
    this.offers = offers;

    this.map = leaflet.map(this.mapRef.current, {
      center: [centerLat, centerLong],
      zoom,
      zoomControl: false,
      marker: true
    });

    this.map.setView([centerLat, centerLong], zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);

    if (this.activeOffer) {
      leaflet
        .marker([activePin.location.lat, activePin.location.long], {icon: ACTIVE_ICON})
        .addTo(this.map);
    } else {
      this.offers.map((offer) => {
        leaflet
          .marker([offer.location.lat, offer.location.long], {icon: ICON})
          .addTo(this.map);
      });
    }
  }

  render() {
    return (
      <div
        id="map"
        ref={this.mapRef}
        style={{height: 100 + `%`}}
      />
    );
  }
}

Map.propTypes = {
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
};
