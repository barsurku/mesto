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
popupEditProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  closePopup(popupButtonEditProfile);

  nameProfile.textContent = nameInput.value;
  infoProfile.textContent = infoInput.value;
});

//Карточки
const elementsTemplate = document.getElementById("elements-template");
const elementsGrid = document.querySelector(".elements__cards");

//попап картинки
const popupElementsImage = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__element-image");
const popupCardSubtitle = document.querySelector(".popup__image-subtitle");

const createCardElement = (cardData) => {
  const cardElement = elementsTemplate.content.querySelector('.elements__element').cloneNode(true);

  const elementName = cardElement.querySelector(".elements__element-title");
  const elementImage = cardElement.querySelector(".elements__element-photo");

  elementName.textContent = cardData.name;
  elementImage.src = cardData.link;
  elementImage.alt = cardData.name;

  //попап картинки
  elementImage.addEventListener("click", () => {
    popupCardImage.src = cardData.link;
    popupCardImage.alt = cardData.name;
    popupCardSubtitle.textContent = cardData.name;
    openPopup(popupElementsImage);
  });

  //кнопки мусорки и лайка
  const buttonLike = cardElement.querySelector(".elements__like_type_like");
  const buttonDelete = cardElement.querySelector(
    ".elements__delete_type_delete"
  );

  const handleLike = () => {
    buttonLike.classList.toggle("elements__like_active");
  };

  const handleDelete = () => {
    cardElement.remove();
  };

  buttonLike.addEventListener("click", handleLike);
  buttonDelete.addEventListener("click", handleDelete);

  return cardElement;
};

const renderCardElement = (cardElement) => {
  elementsGrid.prepend(cardElement);
};

initialCards.forEach((elements__element) => {
  renderCardElement(createCardElement(elements__element));
});

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

  renderCardElement(createCardElement(cardData));
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