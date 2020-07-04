const AVATAR_URL = `https://api.adorable.io/avatars/128`;
const REVIEWS_COUNT = 11;

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const generateReviews = () => {
  const reviews = [];

  for (let i = 0; i < REVIEWS_COUNT; i++) {
    reviews.push({
      id: i,
      avatar: AVATAR_URL,
      name: `Angelina`,
      rating: getRandomIntegerNumber(0, 4) + Math.round(Math.random() * 10) / 10,
      date: new Date(),
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    });
  }

  return reviews;
};

export const reviews = generateReviews();
