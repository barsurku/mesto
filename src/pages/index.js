import "./index.css";

import { FormValidator } from "../scripts/FormValidator.js";
import { Section } from "../scripts/Section.js";
import { Card } from "../scripts/Card.js";
import { initialCards } from "../scripts/initialCards.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";

//конфиг
const config = {
  formElement: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error_visible",
};

//профиль
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupButtonEditProfile = document.querySelector(
  ".popup_type_edit-button"
);
const popupEditProfileForm = popupButtonEditProfile.querySelector(
  ".popup__form_type_edit-profile"
);

//профиль - попап и редактирование
const userInfo = new UserInfo({
  nameUserSelector: ".profile__title",
  infoUserSelector: ".profile__subtitle",
});

const profilePopup = new PopupWithForm({
  popupSelector: ".popup_type_edit-button",
  handleFormSubmit: (cardData) => {
    userInfo.setUserInfo({
      title: cardData.nameUser,
      subtitle: cardData.infoUser,
    });
    profilePopup.close();
  },
});

//попап профиля
buttonEditProfile.addEventListener("click", () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  formValidatorProfile.resetValidation();
  profilePopup.open();
});

//Карточки
const formAddElements = document.querySelector(
  ".popup__form_type_add-elements"
);
const buttonAddCards = document.querySelector(".profile__add-button");

const addCardsPopup = new PopupWithForm({
  popupSelector: ".popup_type_add-button",
  handleFormSubmit: (cardData) => {
    const addCardElement = renderCardElement(cardData);
    section.addItem(addCardElement, "prepend");
    addCardsPopup.close();
  },
});

const cardSection = {
  items: initialCards,
  renderer: (item) => {
    section.addItem(renderCardElement(item));
  },
};

//класс section и функция создания карточек
const section = new Section(cardSection, ".elements__cards");
section.renderItems();

function renderCardElement(cardData) {
  const cardElement = new Card(cardData, handleCardClick, "#elements-template");
  const addCardElement = cardElement.createCardElement();
  return addCardElement;
}

//попап кнопки add
buttonAddCards.addEventListener("click", function () {
  formValidatorAddCard.resetValidation();
  addCardsPopup.open();
});

//попап картинки
const imagePopup = new PopupWithImage(".popup_type_image");
function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

//валидация попапа профиля c formValid
const formValidatorProfile = new FormValidator(config, popupEditProfileForm);
formValidatorProfile.enableValidation();

//валидация попапа добавлений карточек c formValid
const formValidatorAddCard = new FormValidator(config, formAddElements);
formValidatorAddCard.enableValidation();

//слушатели
profilePopup.setEventListener();
addCardsPopup.setEventListener();
imagePopup.setEventListener();