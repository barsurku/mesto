export class Card {
  #link;
  #name;
  #cardElement;
  #templateSelector;
  #handleClickPopup;

  #getTemplate() {
    return document
      .querySelector(this.#templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
  }
  constructor(
    { cardData, handleClickPopup },
    templateSelector
  ) {
    this.#name = cardData.name;
    this.#link = cardData.link;

    this.#templateSelector = templateSelector;
    this.#handleClickPopup = handleClickPopup;
  }

  createCardElement() {
    this.#cardElement = this.#getTemplate();

    const elementName = this.#cardElement.querySelector(
      ".elements__element-title"
    );
    const elementImage = this.#cardElement.querySelector(
      ".elements__element-photo"
    );

    elementName.textContent = this.#name;
    elementImage.src = this.#link;
    elementImage.alt = this.#name;

    this._setEventListeners();
    return this.#cardElement;
  };

  //кнопки мусорки и лайка
  _handleClickDel() {
    this.#cardElement.remove();
  };

  _handleClickLike(buttonLike) {
    buttonLike.classList.toggle("elements__like_active");
  };
  
  _setEventListeners() {
    const buttonLike = this.#cardElement.querySelector(
      ".elements__like_type_like"
    );
    buttonLike.addEventListener("click", () => {
      this._handleClickLike(buttonLike);
    });
    
    const buttonDelete = this.#cardElement.querySelector(
      ".elements__delete_type_delete"
    );
    buttonDelete.addEventListener("click", () => {
      this._handleClickDel(this.#cardElement);
    });

    //попап картинки
    const elementImage = this.#cardElement.querySelector(
      ".elements__element-photo"
    );
    elementImage.addEventListener("click", () => {
      this.#handleClickPopup(this.#link, this.#name);
    });
  }
};    