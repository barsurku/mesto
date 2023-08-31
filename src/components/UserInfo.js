export class UserInfo {
  #nameUser;
  #infoUser;
  constructor({ nameUserSelector, infoUserSelector }) {
    this.#nameUser = document.querySelector(nameUserSelector);
    this.#infoUser = document.querySelector(infoUserSelector);
  };

  getUserInfo() {
    const userInfo = {
      nameUser: this.#nameUser.textContent,
      infoUser: this.#infoUser.textContent,
    };
    return userInfo;
  };

  setUserInfo({ title, subtitle }) {
    this.#nameUser.textContent = title;
    this.#infoUser.textContent = subtitle;
  };
}