import * as React from "react";
import {City} from "../../types";

interface Props {
  activeItem: City,
  cities: Array<City>,
  onActiveItemChange: (city: City) => void,
  onCityClick: (city: City) => void,
}

class CitiesList extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.handleCityClick = this.handleCityClick.bind(this);
  }

  handleCityClick(city: City) {
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

export default CitiesList;
