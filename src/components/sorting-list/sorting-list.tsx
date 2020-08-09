import * as React from "react";
import {SortType} from "../../utils";

interface Props {
  activeSort: string,
  isToggleChecked: boolean,
  onSortClick: (sort: string) => void,
  onToggleClick: () => void,
}

const SortingList: React.FC<Props> = (props: Props) => {
  const {
    activeSort,
    isToggleChecked,
    onSortClick,
    onToggleClick,
  } = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={onToggleClick}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isToggleChecked && <ul className="places__options places__options--custom places__options--opened">
        {Object.values(SortType).map((sort: string) => {
          const sortClassName = sort === activeSort ? ` places__option--active` : ``;

          return (
            <li
              key={sort}
              className={`places__option` + sortClassName}
              tabIndex={0}
              onClick={() => onSortClick(sort)}>
              {sort}
            </li>
          );
        })}
      </ul>}
    </form>
  );
};

export default React.memo(SortingList);
