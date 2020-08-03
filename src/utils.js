export const AppRoute = {
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  OFFER: `/offer/:id`,
  MAIN: `/`,
};

export const CardClass = {
  MAIN: {
    articleClass: `cities__place-card`,
    imageClass: `cities`,
    infoClass: ``,
    imageWidth: `260`,
    imageHeight: `200`,
  },
  PROPERTY: {
    articleClass: `near-places__card`,
    imageClass: `near-places`,
    infoClass: ``,
    imageWidth: `260`,
    imageHeight: `200`,
  },
  FAVORITE: {
    articleClass: `favorites__card`,
    imageClass: `favorites`,
    infoClass: `favorites__card-info `,
    imageWidth: `150`,
    imageHeight: `110`,
  },
};

export const FavoriteStatus = {
  FAVORITE: `1`,
  NOT_FAVORITE: `0`,
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

export const getCitiesForList = (offersAll) => {
  const allCities = offersAll.map((offer) => offer.city);
  const allCitiesNames = allCities.map((city) => city.name);
  const uniqueCitiesNames = [...new Set(allCitiesNames)];

  const checkCitiesForList = (cityName) => {
    return allCities.find((city) => city.name === cityName);
  };

  return uniqueCitiesNames.map(checkCitiesForList);
};

export const findOffersByCity = (offersAll, city) => {
  return offersAll.filter((offer) => {
    return offer.city.name === city.name;
  });
};
