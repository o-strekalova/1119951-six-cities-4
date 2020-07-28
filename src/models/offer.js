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
    this.id = data[`id`];
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

  toRAW() {
    return {
      "bedrooms": this.bedrooms,
      "city": {
        "location": {
          "latitude": String(this.city.location.lat),
          "longitude": String(this.city.location.long),
          "zoom": String(this.city.location.zoom),
        },
        "name": this.city.name
      },
      "description": this.description,
      "goods": this.features,
      "host": {
        "avatar_url": this.owner.avatar,
        "id": this.owner.id,
        "is_pro": String(this.owner.isSuper),
        "name": this.owner.name,
      },
      "id": this.id,
      "images": this.pictures,
      "is_favorite": String(this.owner.isFavorite),
      "is_premium": String(this.owner.isPremium),
      "location": {
        "latitude": String(this.location.lat),
        "longitude": String(this.location.long),
        "zoom": String(this.location.zoom),
      },
      "max_adults": this.guests,
      "preview_image": this.preview,
      "price": this.price,
      "rating": 4.8,
      "title": this.title,
      "type": this.type,
    };
  }

  static parseOffer(data) {
    return new Offer(data);
  }

  static parseOffers(data) {
    return data.map(Offer.parseOffer);
  }
}
