export const getRatingPercentage = (rating) => {
  return Math.round(rating) * 20;
};

export const CardsListClass = {
  MAIN: `cities__places-list tabs__content`,
  PROPERTY: `near-places__list`,
};

export const CardClass = {
  MAIN: `cities__place-card`,
  PROPERTY: `near-places__card`,
};
