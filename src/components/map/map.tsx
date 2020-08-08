import * as React from "react";
import * as leaflet from "leaflet";
import {Offer} from "../../types";

interface Props {
  activePin: Offer,
  centerLat: number,
  centerLong: number,
  zoom: number,
  offers: Array<Offer>,
}

const ICON = leaflet.icon({
  iconUrl: `../../img/pin.svg`,
  iconSize: [27, 39]
});

const ACTIVE_ICON = leaflet.icon({
  iconUrl: `../../img/pin-active.svg`,
  iconSize: [27, 39]
});

export default class MineMap extends React.PureComponent<Props> {
  private mapRef: React.RefObject<HTMLDivElement>;
  private map: leaflet.Map | null;
  private activeOffer: Offer | null;
  private activeMarker: leaflet.Marker | null;
  private centerLat: number | null;
  private centerLong: number | null;
  private offers: Array<Offer> | [];

  constructor(props: Props) {
    super(props);

    this.mapRef = React.createRef();
    this.map = null;
    this.activeOffer = null;
    this.activeMarker = null;
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
      this.activeMarker = null;

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
