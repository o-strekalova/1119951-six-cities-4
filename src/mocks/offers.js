const OFFERS_TITLES = [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Canal View Prinsengracht`, `Nice, cozy, warm big bed apartment`];
const OFFERS_TYPES = [`apartment`, `room`, `house`, `hotel`];
const AVATAR_URL = `https://api.adorable.io/avatars/128`;
const COORDINATES = [
  [52.3909553943508, 4.85309666406198],
  [52.369553943508, 4.85309666406198],
  [52.3909553943508, 4.929309666406198],
  [52.3809553943508, 4.939309666406198]
];
const OFFERS_COUNT = 4;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const generateOffers = () => {
  const offers = [];

  for (let i = 0; i < OFFERS_COUNT; i++) {
    offers.push({
      id: i,
      coords: COORDINATES[i],
      pictures: [`img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/room.jpg`, `img/apartment-01.jpg`, `img/apartment-02.jpg`],
      title: getRandomArrayItem(OFFERS_TITLES),
      type: getRandomArrayItem(OFFERS_TYPES),
      price: getRandomIntegerNumber(50, 1000),
      isPremium: Math.random() > 0.5,
      rating: getRandomIntegerNumber(0, 4) + Math.round(Math.random() * 10) / 10,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
      bedrooms: getRandomIntegerNumber(1, 10),
      guests: getRandomIntegerNumber(1, 20),
      features: [`Wi-Fi`, `Washing machine`, `Towels`, `Heating`, `Coffee machine`, `Baby seat`, `Kitchen`, `Dishwasher`, `Cabel TV`, `Fridge`],
      owner: {
        avatar: AVATAR_URL,
        name: `Angelina`,
        isSuper: Math.random() > 0.5,
      },
    });
  }

  return offers;
};

export const offers = generateOffers();
