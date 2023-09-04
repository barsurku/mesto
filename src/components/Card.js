export class Card {
  #cardData;
  #link;
  #name;
  #cardElement;
  #templateSelector;
  #handleCardClick;
  #handleClickDel;
  #handleClickLike;

  #buttonLike;
  #buttonDelete;

  #likes;

  #getTemplate() {
    return document
      .querySelector(this.#templateSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
  }
  constructor(
    cardData,
    handleCardClick,
    handleClickDel,
    userId,
    handleClickLike,
    handleRemoveLike,
    templateSelector
  ) {
    this.#cardData = cardData;
    this.#name = cardData.name;
    this.#link = cardData.link;

    this.#templateSelector = templateSelector;
    this.#handleCardClick = handleCardClick;
    this.#handleClickDel = handleClickDel;
    this.#handleClickLike = handleClickLike;
    this._handleRemoveLike = handleRemoveLike;

    this.#likes = cardData.likes;
    this._userId = userId;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
  };

  createCardElement() {
    this.#cardElement = this.#getTemplate();

    const elementName = this.#cardElement.querySelector(
      ".elements__element-title"
    );
    const elementImage = this.#cardElement.querySelector(
      ".elements__element-photo"
    );
    this.#buttonDelete = this.#cardElement.querySelector(
      ".elements__delete_type_delete"
    );

    this.#buttonLike = this.#cardElement.querySelector(
      ".elements__like_type_like"
    );

    elementName.textContent = this.#name;
    elementImage.alt = this.#name;
    elementImage.src = this.#link;

    this._ownerCard();
    this.checkLike();
    this.countLikes(this.#likes);

    this._setEventListeners();
    return this.#cardElement;
  };

  _ownerCard() {
    if (this._ownerId !== this._userId) {
      this.#buttonDelete.remove();
    }
  };

  deleteMyCard() {
    this.#cardElement.remove();
    this.#cardElement = null;
  };

  countLikes(likes) {
    this._likeCount = this.#cardElement.querySelector(
      ".elements__like_numbers"
    );
    if (likes.length) {
      this._likeCount.textContent = likes.length;
    } else {
      this._likeCount.textContent = "";
    }
  };

  activeLike() {
    this.#buttonLike.classList.add("elements__like_active");
  };

  removeLike() {
    this.#buttonLike.classList.remove("elements__like_active");
  };

  checkLike() {
    this.#likes.forEach((item) => {
      if (item._id === this._userId) {
        this.#buttonLike.classList.add("elements__like_active");
      }
    });
  };

  _setEventListeners() {
    this.#buttonLike.addEventListener("click", () => {
      if (this.#buttonLike.classList.contains("elements__like_active")) {
        this._handleRemoveLike(this);
      } else {
        this.#handleClickLike(this);
      }
    });

    this.#buttonDelete.addEventListener("click", () => {
      this.#handleClickDel(this._cardId);
    });

    //попап картинки
    const elementImage = this.#cardElement.querySelector(
      ".elements__element-photo"
    );
    elementImage.addEventListener("click", () => {
      this.#handleCardClick(this.#link, this.#name);
    });
  };
};