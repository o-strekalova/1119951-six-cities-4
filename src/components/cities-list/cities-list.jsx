import PropTypes from "prop-types";
import React, {PureComponent} from "react";

class CitiesList extends PureComponent {

  render() {
    const {
      cities,
      activeCity,
      onCityClick
    } = this.props;

    return (
      <ul className="locations__list tabs__list">
        {cities.map((city) => {
          const className = city === activeCity ? ` tabs__item--active` : ``;

          return (
            <li
              key={city}
              className="locations__item"
              onClick={() => onCityClick(city)}>
              <a className={`locations__item-link tabs__item` + className} href="#">
                <span>{city}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired),
  activeCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func,
};

export default CitiesList;
