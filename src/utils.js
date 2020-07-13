export const CardsListClass = {
  MAIN: `cities__places-list tabs__content`,
  PROPERTY: `near-places__list`,
};

export const CardClass = {
  MAIN: `cities__place-card`,
  PROPERTY: `near-places__card`,
};

export const SortType = {
  POPULAR: `Popular`,
  PRICE_FROM_LOW: `Price: low to high`,
  PRICE_FROM_HIGH: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getRatingPercentage = (rating) => {
  return Math.round(rating) * 20;
};
