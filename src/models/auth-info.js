export default class AuthInfo {
  constructor(data) {
    this.avatar = data[`avatar_url`];
    this.email = data[`email`];
    this.id = data[`id`];
    this.isSuper = Boolean(data[`is_pro`]);
    this.name = data[`name`];
  }

  static parseAuthInfo(data) {
    return new AuthInfo(data);
  }
}
