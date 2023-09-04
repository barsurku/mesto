import "./index.css";

import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { apiConfig } from "../utils/initialCards.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupConfirnationDelete } from "../components/PopupConfirnationDelete.js";

// api
const api = new Api(apiConfig);
let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user,items]) => {
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    userId = user._id;
    cardSection.renderItems(items);
  })
  .catch((err) => console.log(err));

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
const nameInput = document.querySelector(".popup__input_type_name");
const infoInput = document.querySelector(".popup__input_type_info");
const popupProfileAvatar = document.querySelector(".popup__form_type-avatar");
const buttonChangeProfileAvatar = document.querySelector(
  ".profile__avatar-button"
);

const userInfo = new UserInfo({
  nameUserSelector: ".profile__title",
  infoUserSelector: ".profile__subtitle",
  userAvatar: ".profile__avatar",
});

//редактирование профиля
const profilePopup = new PopupWithForm({
  popupSelector: ".popup_type_edit-button",
  handleFormSubmit: (formValue) => {
    profilePopup.saveLoading(true);
    api
      .editProfile(formValue)
      .then(() => {
        userInfo.setUserInfo(formValue);
        profilePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => profilePopup.saveLoading(false));
  },
});

//попап кнопки edit
buttonEditProfile.addEventListener("click", () => {
  const getInputValues = userInfo.getUserInfo();
  nameInput.value = getInputValues.nameUserSelector;
  infoInput.value = getInputValues.infoUserSelector;
  formValidatorProfile.resetValidation();
  profilePopup.open();
});

//avatar
const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_type-avatar",
  handleFormSubmit: (data) => {
    popupAvatar.saveLoading(true);
    api
      .changeProfileAvatar(data.link)
      .then((data) => {
        userInfo.setUserAvatar(data);
        popupAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupAvatar.saveLoading(false));
  },
});

//попап изменения аватара
buttonChangeProfileAvatar.addEventListener("click", () => {
  popupProfileAvatar.reset();
  formValidatorAvatar.resetValidation();
  popupAvatar.open();
});

//Карточки
const formAddCard = document.querySelector(".popup__form_type_add-elements");
const buttonAddCards = document.querySelector(".profile__add-button");



const addCardsPopup = new PopupWithForm({
  popupSelector: ".popup_type_add-button",
  handleFormSubmit: (cardData) => {
    addCardsPopup.saveLoading(true);
    api
      .addNewCard(cardData)
      .then((res) => {
        const addCardElement = createCard(res);
        cardSection.prepend(addCardElement);
        addCardsPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        addCardsPopup.saveLoading(false);
      });
  },
});

const cardSection = new Section({
  renderer: (cardData) => {
    const cardElement = createCard(cardData);
    cardSection.append(cardElement);
  }
}, ".elements__cards");

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    handleCardClick,
    handleClickDel,
    userId,
    handleClickLike,
    handleRemoveLike,
    "#elements-template"
  );
  return cardElement.createCardElement();

}

//попап кнопки add
buttonAddCards.addEventListener("click", function () {
  formValidatorAddCard.resetValidation();
  addCardsPopup.open();
});

//подтверждение удаления своей карточки
const popupDeleteConfirm = new PopupConfirnationDelete(
  ".popup_type-confirm-delete"
);

function handleClickDel(cardId) {
  popupDeleteConfirm.open();
  popupDeleteConfirm.deleteCardSubmit(() => {
    api
      .deleteMyCard(cardId)
      .then(() => {
        this.deleteMyCard();
        popupDeleteConfirm.close();
      })
      .catch((err) => console.log(err));
  });
}

//счётчик лайков и удаление лайков
function handleClickLike(cardData) {
  api
    .getLikeCard(cardData._cardId)
    .then((res) => {
      cardData.activeLike();
      cardData.countLikes(res.likes);
    })
    .catch((err) => console.log(err));
}

function handleRemoveLike(cardData) {
  api
    .getRemoveLikeCard(cardData._cardId)
    .then((res) => {
      cardData.removeLike();
      cardData.countLikes(res.likes);
    })
    .catch((err) => console.log(err));
}

//попап картинки
const imagePopup = new PopupWithImage(".popup_type_image");
function handleCardClick(link, name) {
  imagePopup.open(link, name);
};

//валидация попапа профиля c formValid
const formValidatorProfile = new FormValidator(
  validationConfig,
  popupEditProfileForm
);
formValidatorProfile.enableValidation();

//валидация попапа добавлений карточек c formValid
const formValidatorAddCard = new FormValidator(validationConfig, formAddCard);
formValidatorAddCard.enableValidation();

//валидация попапа аватара профиля с formValid
const formValidatorAvatar = new FormValidator(
  validationConfig,
  popupProfileAvatar
);
formValidatorAvatar.enableValidation();

//слушатели
profilePopup.setEventListener();
addCardsPopup.setEventListener();
imagePopup.setEventListener();
popupAvatar.setEventListener();
popupDeleteConfirm.setEventListener();