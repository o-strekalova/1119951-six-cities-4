import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {SortType} from "../../utils";

class SortingList extends PureComponent {
  render() {
    const {
      activeSort,
      onSortClick,
    } = this.props;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex="0">
          {activeSort}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          {Object.values(SortType).map((sort) => {
            const sortClassName = sort === activeSort ? ` places__option--active` : ``;

            return (
              <li
                key={sort}
                className={`places__option` + sortClassName}
                tabIndex="0"
                onClick={() => onSortClick(sort)}>
                {sort}
              </li>
            );
          })}
        </ul>
      </form>
    );
  }
}

SortingList.propTypes = {
  activeSort: PropTypes.string.isRequired,
  onSortClick: PropTypes.func,
};

export default SortingList;
