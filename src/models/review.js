export default class Review {
  constructor(data) {
    this.text = data[`comment`];
    this.date = new Date(data[`date`]);
    this.id = String(data[`id`]);
    this.rating = data[`rating`];
    this.user = {
      avatar: data[`user`][`avatar_url`],
      id: data[`user`][`id`],
      isSuper: Boolean(data[`user`][`is_pro`]),
      name: data[`user`][`name`]
    };
  }

  static parseReview(data) {
    return new Review(data);
  }

  static parseReviews(data) {
    return data.map(Review.parseReview);
  }
}
