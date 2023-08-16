export class Card {
  #link;
  #name;
    #cardElement;
    #templateSelector;
    #handleClickDel;
    #handleClickLike;
    #handleClickPopup;

    #getTemplate() {
        return document.
        querySelector(this.#templateSelector)
        .content.querySelector('.elements__element')
        .cloneNode(true);
    }
    constructor ({cardData, handleClickDel, handleClickLike, handleClickPopup}, templateSelector) {
        this.#name = cardData.name;
        this.#link = cardData.link;

        this.#templateSelector = templateSelector;
        this.#handleClickDel = handleClickDel;
        this.#handleClickLike = handleClickLike;
        this.#handleClickPopup = handleClickPopup;
        }
        
     createCardElement() {
        this.#cardElement = this.#getTemplate();
      
        const elementName = this.#cardElement.querySelector(".elements__element-title");
        const elementImage = this.#cardElement.querySelector(".elements__element-photo");
      
        elementName.textContent = this.#name;
        elementImage.src = this.#link;
        elementImage.alt = this.#name;
      
        //попап картинки
        elementImage.addEventListener("click", () => {
          this.#handleClickPopup(this.#link, this.#name)
        });
      
        //кнопки мусорки и лайка
        const buttonLike = this.#cardElement.querySelector(".elements__like_type_like");
        const buttonDelete = this.#cardElement.querySelector(
          ".elements__delete_type_delete"
        );
      
        buttonLike.addEventListener("click", () => {
          this.#handleClickLike(buttonLike);
        });

        buttonDelete.addEventListener("click", () => {
          this.#handleClickDel(this.#cardElement);
        });

    return this.#cardElement;
      }}
    