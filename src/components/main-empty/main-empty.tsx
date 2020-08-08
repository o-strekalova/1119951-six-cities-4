import * as React from "react";
import {City} from "../../types";

interface Props {
  activeCity: City | null,
}

const MainEmpty: React.FC<Props> = (props: Props) => {
  const {activeCity} = props;

  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property availbale at the moment{activeCity ? ' in ' + activeCity.name : ``}</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );
};

export default React.memo(MainEmpty);
