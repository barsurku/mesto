import { FormValidator } from "./FormValidator.js";
import { List } from "./List.js";
import { Card } from "./card.js";
import { initialCards } from "./initialCards.js";

 //конфиг
  const config = {
  formElement: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_invalid",
  errorClass: "popup__input-error_visible",
};

//отрытие-закрытие попапов
const openPopup = (popup) => {
  popup.classList.add("popup_open");

  window.addEventListener('keydown', closeByEsc);
};
const closePopup = (popup) => {
  popup.classList.remove("popup_open");

  window.removeEventListener('keydown', closeByEsc);

};

//закрытие popup на esc
function closeByEsc(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_open');
    closePopup(openPopup);
  }
}

//закрытие popup оверлеем
function closeByOverlay(popup) {
  popup.addEventListener('mousedown', (event) => {
    const overlay = !event.target.closest('.popup__content');

    if (overlay) {
      closePopup(popup);
    }
  });
}

//редакт профиля
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupButtonEditProfile = document.querySelector(
  ".popup_type_edit-button"
);
const popupEditProfileCloseButton =
  popupButtonEditProfile.querySelector(".popup__close");
const nameInput = popupButtonEditProfile.querySelector(
  ".popup__input_type_name"
);
const nameProfile = document.querySelector(".profile__title");
const infoInput = popupButtonEditProfile.querySelector(
  ".popup__input_type_info"
);
const infoProfile = document.querySelector(".profile__subtitle");
const popupEditProfileForm =
  popupButtonEditProfile.querySelector(".popup__form_type_edit-profile");

//Отрытие попапа
buttonEditProfile.addEventListener("click", () => {
  openPopup(popupButtonEditProfile);

  nameInput.value = nameProfile.textContent;
  infoInput.value = infoProfile.textContent;
});

//закрытие попапа нажатием на крестик
popupEditProfileCloseButton.addEventListener("click", () => {
  closePopup(popupButtonEditProfile);
});

//Имя, о себе
function handleEditProfileSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  infoProfile.textContent = infoInput.value;

  closePopup(popupButtonEditProfile);
}

//Карточки
//попап картинки
const popupElementsImage = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__element-image");
const popupCardSubtitle = document.querySelector(".popup__image-subtitle");

//функции карточек из класса card
function handleClickDel(cardElement) {
    cardElement.remove();
};

function handleClickLike(buttonLike) {
  buttonLike.classList.toggle("elements__like_active");
};

function handleClickPopup(link, name) {
  popupCardImage.src = link;
  popupCardImage.alt = name;
  popupCardSubtitle.textContent = name;
  openPopup(popupElementsImage);
};

//карточки с классом Card и List
function renderCardElement ({cardData, position = "append"}) {
  const cardElement = new Card({cardData, handleClickDel, handleClickLike, handleClickPopup}, "#elements-template").createCardElement();
  cardListInstance.addItem(cardElement, position);
};

//Добавление карточек + попап кнопки add
const popupAddElements = document.querySelector(".popup_type_add-button");
const buttonAddElements = document.querySelector(".profile__add-button");
const formAddElements = document.querySelector(
  ".popup__form_type_add-elements");

const titleInput = formAddElements.querySelector(
  ".popup__input_type_element-name");
const linkInput = formAddElements.querySelector(".popup__input_type_link");

const popupAddElementsCloseButton =
  popupAddElements.querySelector(".popup__close");

buttonAddElements.addEventListener("click", () => {
  openPopup(popupAddElements);
});

const handleAddElementsSubmit = (event) => {
  event.preventDefault();

  const name = titleInput.value;
  const link = linkInput.value;

  const cardData = {
    name,
    link,
  };

  renderCardElement({ cardData, position: "prepend" });
  closePopup(popupAddElements);

  formAddElements.reset();
};

formAddElements.addEventListener("submit", handleAddElementsSubmit);

//закрытие add попапа нажатием на крестик
popupAddElementsCloseButton.addEventListener("click", () => {
  closePopup(popupAddElements);
});

//закрытие image попапа нажатием на крестик
const imagePopupCloseBtn = document.querySelector(".popup__close-image");

imagePopupCloseBtn.addEventListener("click", () => {
  closePopup(popupElementsImage);
});

//закрытие попапов на оверлей
closeByOverlay(popupButtonEditProfile);
closeByOverlay(popupAddElements);
closeByOverlay(popupElementsImage);

//класс List
const cardListInstance = new List(renderCardElement,".elements__cards" );
cardListInstance.renderItems(initialCards);

//валидация попапа профиля c formValid
const formValidatorProfile = new FormValidator(config, popupEditProfileForm);
formValidatorProfile.enableValidation();
popupEditProfileForm.addEventListener('submit', handleEditProfileSubmit);

//валидация попапа добавлений карточек c formValid
const formValidatorAddCard = new FormValidator(config, formAddElements);
formValidatorAddCard.enableValidation();
formAddElements.addEventListener('submit', handleAddElementsSubmit);