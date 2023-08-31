import { Popup } from "../scripts/Popup.js";

export class PopupWithForm extends Popup {
  #handleFormSubmit;
  #inputList;

  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this.#handleFormSubmit = handleFormSubmit;
    this.popupForm = this.popup.querySelector(".popup__form");
    this.#inputList = this.popupForm.querySelectorAll(".popup__input");
  };

  _getInputValues() {
    const values = {};
    this.#inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  };

  setInputValues(cardData) {
    this.#inputList.forEach((input) => {
      input.value = cardData[input.name];
    });
  };

  setEventListener() {
    super.setEventListener();
    this.popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.#handleFormSubmit(this._getInputValues());
      this.close();
    });
  };

  close() {
    super.close();
    this.popupForm.reset();
  };
};