import { Popup } from "./Popup.js";

export class PopupConfirnationDelete extends Popup {
  #deleteCardSubmit
  
  constructor(popupSelector) {
    super(popupSelector);
    this.popupForm = this.popup.querySelector('.popup__form');
  }

  deleteCardSubmit(del) {
    this.#deleteCardSubmit = del;
  }

  setEventListener() {
    this.popupForm.addEventListener('submit', event => {
      event.preventDefault();
      this.#deleteCardSubmit();
    })
    super.setEventListener();
  }
}