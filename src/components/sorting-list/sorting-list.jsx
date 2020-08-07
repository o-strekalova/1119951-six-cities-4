import PropTypes from "prop-types";
import React from "react";
import {SortType} from "../../utils";

const SortingList = (props) => {
  const {
    activeSort,
    onSortClick,
    isToggleChecked,
    onToggleClick,
  } = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={onToggleClick}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isToggleChecked && <ul className="places__options places__options--custom places__options--opened">
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
      </ul>}
    </form>
  );
};

SortingList.propTypes = {
  activeSort: PropTypes.string.isRequired,
  isToggleChecked: PropTypes.bool.isRequired,
  onSortClick: PropTypes.func,
  onToggleClick: PropTypes.func,
};

export default React.memo(SortingList);
