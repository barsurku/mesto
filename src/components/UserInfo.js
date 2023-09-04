export class UserInfo {
  #nameUserSelector;
  #infoUserSelector;
  #userAvatar;
  #userId;
  constructor({ nameUserSelector, infoUserSelector, userAvatar }) {
    this.#nameUserSelector = document.querySelector(nameUserSelector);
    this.#infoUserSelector = document.querySelector(infoUserSelector);
    this.#userAvatar = document.querySelector(userAvatar);
  };

  getUserInfo() {
    const userInfo = {
      nameUserSelector: this.#nameUserSelector.textContent,
      infoUserSelector: this.#infoUserSelector.textContent,
      userId: this.#userId,
    };
    return userInfo;
  };

  setUserInfo(evt) {
    this.#nameUserSelector.textContent = evt.name;
    this.#infoUserSelector.textContent = evt.about;
  };

  setUserAvatar(data) {
    this.#userAvatar.src = data.avatar;
    this.#userAvatar.alt = data.name;
  };
}