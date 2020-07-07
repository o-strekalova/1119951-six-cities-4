import PropTypes from "prop-types";
import React, {PureComponent} from "react";
class CitiesList extends PureComponent {

  render() {
    const {
      cities,
      city,
      onCityClick
    } = this.props;

    return (
      <ul className="locations__list tabs__list">
        {cities.map((it) => {
          const className = it === city ? `locations__item-link tabs__item tabs__item--active` : `locations__item-link tabs__item`;

          return (
            <li
              key={it}
              className="locations__item"
              onClick={(evt) => {
                const activeCity = evt.target.textContent;
                onCityClick(activeCity);
              }}>
              <a className={className} href="#">
                <span>{it}</span>
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
  city: PropTypes.string.isRequired,
  onCityClick: PropTypes.func,
};

export default CitiesList;
