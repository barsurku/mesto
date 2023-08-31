import "./index.css";

import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../utils/initialCards.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

//конфиг
const validationConfig = {
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
  handleFormSubmit: (formValues) => {
    userInfo.setUserInfo({
      title: formValues.nameUser,
      subtitle: formValues.infoUser,
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
const formAddCard = document.querySelector(
  ".popup__form_type_add-elements"
);
const buttonAddCards = document.querySelector(".profile__add-button");

const addCardsPopup = new PopupWithForm({
  popupSelector: ".popup_type_add-button",
  handleFormSubmit: (cardData) => {
    const addCardElement = createCard(cardData);
    cardsSection.addItem(addCardElement, "prepend");
    addCardsPopup.close();
  },
});


const cardSectionOptions = {
  items: initialCards,
  renderer: (item) => {
    cardsSection.addItem(createCard(item));
  },
};

//класс section и функция создания карточек
const cardsSection = new Section(cardSectionOptions, ".elements__cards");
cardsSection.renderItems();

function createCard(cardData) {
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
const formValidatorProfile = new FormValidator(validationConfig, popupEditProfileForm);
formValidatorProfile.enableValidation();

//валидация попапа добавлений карточек c formValid
const formValidatorAddCard = new FormValidator(validationConfig, formAddCard);
formValidatorAddCard.enableValidation();

//слушатели
profilePopup.setEventListener();
addCardsPopup.setEventListener();
imagePopup.setEventListener();