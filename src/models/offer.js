export default class Offer {
  constructor(data) {
    this.bedrooms = data[`bedrooms`];
    this.city = {
      location: {
        lat: Number(data[`city`][`location`][`latitude`]),
        long: Number(data[`city`][`location`][`longitude`]),
        zoom: Number(data[`city`][`location`][`zoom`]),
      },
      name: data[`city`][`name`],
    };
    this.description = data[`description`];
    this.features = data[`goods`];
    this.owner = {
      avatar: data[`host`][`avatar_url`],
      id: data[`host`][`id`],
      isSuper: Boolean(data[`host`][`is_pro`]),
      name: data[`host`][`name`]
    };
    this.id = String(data[`id`]);
    this.pictures = data[`images`];
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.isPremium = Boolean(data[`is_premium`]);
    this.location = {
      lat: Number(data[`location`][`latitude`]),
      long: Number(data[`location`][`longitude`]),
      zoom: Number(data[`location`][`zoom`]),
    };
    this.guests = data[`max_adults`];
    this.preview = data[`preview_image`];
    this.price = data[`price`];
    this.rating = data[`rating`];
    this.title = data[`title`];
    this.type = data[`type`];
  }

  static parseOffer(data) {
    return new Offer(data);
  }

  static parseOffers(data) {
    return data.map(Offer.parseOffer);
  }
}
