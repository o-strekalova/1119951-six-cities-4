import PropTypes from "prop-types";
import React, {PureComponent} from "react";

class CitiesList extends PureComponent {
  constructor(props) {
    super(props);

    this._handleCityClick = this._handleCityClick.bind(this);
  }

  _handleCityClick(city) {
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
          const className = city === activeItem ? ` tabs__item--active` : ``;

          return (
            <li
              key={city}
              className="locations__item"
              onClick={() => this._handleCityClick(city)}>
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
  activeItem: PropTypes.string.isRequired,
  onActiveItemChange: PropTypes.func,
  onCityClick: PropTypes.func,
};

export default CitiesList;
