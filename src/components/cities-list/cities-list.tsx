import PropTypes from "prop-types";
import React, {PureComponent} from "react";

class CitiesList extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCityClick = this.handleCityClick.bind(this);
  }

  handleCityClick(city) {
    this.props.onActiveItemChange(city);
    this.props.onCityClick(city);
  }

  render() {
    const {
      activeItem,
      cities,
    } = this.props;

    return (
      <ul className="locations__list tabs__list">
        {cities.map((city) => {
          const className = city.name === activeItem.name ? ` tabs__item--active` : ``;

          return (
            <li
              key={city.name}
              className="locations__item"
              onClick={() => this.handleCityClick(city)}>
              <a className={`locations__item-link tabs__item` + className} href="#">
                <span>{city.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
    name: PropTypes.string.isRequired,
  })),
  activeItem: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
    name: PropTypes.string,
  }),
  onActiveItemChange: PropTypes.func,
  onCityClick: PropTypes.func,
};

export default CitiesList;
