export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  };

  open() {
    this.popup.classList.add("popup_open");
    document.addEventListener("keyup", this._handleEscClose);
  };
  close() {
    this.popup.classList.remove("popup_open");
    document.removeEventListener("keyup", this._handleEscClose);
  };

  setEventListener() {
    this.popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target === evt.currentTarget ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
};