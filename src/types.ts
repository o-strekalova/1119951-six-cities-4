type Email = {
  email: string,
};

export interface User {
  avatar: string,
  name: string,
  isSuper: boolean,
  id: number,
};

export type AuthInfo = User & Email;

export interface Location {
  lat: number,
  long: number,
  zoom: number,
};

export interface City {
  location: Location,
  name: string
};

export interface Offer {
  id: string,
  pictures: Array<string>,
  title: string,
  type: `apartment` | `room` | `house` | `hotel`,
  price: number,
  isPremium: boolean,
  isFavorite: boolean,
  rating: number,
  description: string,
  bedrooms: number,
  guests: number,
  features: Array<string>,
  preview: string,
  owner: User,
  city: City,
  location: Location,
};

export interface Review {
  id: string,
  date: Date,
  rating: number,
  text: string,
  user: User,
};

export interface CardClass {
  articleClass: string,
  imageClass: string,
  infoClass: string,
  imageWidth: string,
  imageHeight: string,
};
