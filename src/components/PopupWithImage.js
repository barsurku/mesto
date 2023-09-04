import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this.popupCardImage = this.popup.querySelector(".popup__element-image");
        this.popupCardSubtitle = this.popup.querySelector(".popup__image-subtitle");
    };

    open(link, name) {
        super.open();
        this.popupCardImage.src = link;
        this.popupCardImage.alt = name;
        this.popupCardSubtitle.textContent = name;
    };
;}
