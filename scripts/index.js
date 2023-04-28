//отрытие-закрытие попапов
const openedPopup = (popup) => {
    popup.classList.add('popup_opened');
};
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
};



//редакт профиля
const editButton = document.querySelector(".profile__edit-button");
const editButtonPopup = document.querySelector(".popup_type_edit-button");
const editButtonPopupCloseButton = editButtonPopup.querySelector(".popup__close");
const nameInput = editButtonPopup.querySelector(".popup__input_type_name");
const nameProfile = document.querySelector(".profile__title");
const infoInput = editButtonPopup.querySelector(".popup__input_type_info");
const infoProfile = document.querySelector(".profile__subtitle");
const editButtonPopupForm = editButtonPopup.querySelector(".popup__form");

//Отрытие попапа
editButton.addEventListener('click', () => {
    openedPopup(editButtonPopup);

    nameInput.value = nameProfile.textContent;
    infoInput.value = infoProfile.textContent;
});

//закрытие попапа нажатием на крестик
    editButtonPopupCloseButton.addEventListener('click', () => {
    editButtonPopup.classList.remove("popup_opened");
});

//Имя, о себе
editButtonPopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    editButtonPopup.classList.remove('popup_opened');

    nameProfile.textContent = nameInput.value;
    infoProfile.textContent = infoInput.value;
});



//Карточки
const elementsTemplate = document.getElementById('elements-template');
const elementsGrid = document.querySelector('.elements__cards');

//попап картинки
const imagePopup = document.querySelector('.popup_type_image');
const elementImagePopup = document.querySelector('.popup__element-image');
const elementSubtitlePopup = document.querySelector('.popup__image-subtitle');

const createCardElement = (cardData) => {
    const cardElement = elementsTemplate.content.querySelector('.elements__element').cloneNode(true);

    const elementName = cardElement.querySelector('.elements__element-title');
    const elementImage = cardElement.querySelector('.elements__element-photo');

    elementName.textContent = cardData.name;
    elementImage.src = cardData.link;
    elementImage.alt = cardData.name;

    //попап картинки
    elementImage.addEventListener("click", () => {
        elementImagePopup.src = cardData.link;
        elementImagePopup.alt = cardData.name;
        elementSubtitlePopup.textContent = cardData.name;
        openedPopup(imagePopup);
    });

    //кнопки мусорки и лайка
    const likeButton = cardElement.querySelector('.elements__like_type_like');
    const deleteButton = cardElement.querySelector('.elements__delete_type_delete');

   const handleLike = () => {
    likeButton.classList.toggle('elements__like_active');
   };

   const handleDelete = () => {cardElement.remove();}
   
    likeButton.addEventListener('click', handleLike);
    deleteButton.addEventListener('click', handleDelete);
       
    return cardElement;
};

const renderCardElement = (cardElement) => {
    elementsGrid.prepend(cardElement);
};

initialCards.forEach((elements__element) => {
    renderCardElement(createCardElement(elements__element));

});



//Добавление карточек + попап кнопки add
const addElementsPopup = document.querySelector('.popup_type_add-button');
const addElementsButton = document.querySelector('.profile__add-button');
const addElementsForm = document.querySelector('.popup__form_type_add-elements');
const addButtonPopupCloseButton = addElementsPopup.querySelector('.popup__close');

addElementsButton.addEventListener('click', () => {
    openedPopup(addElementsPopup);
});

const handleAddElementsSubmit = (event) => {
    event.preventDefault();

    const titleInput = addElementsForm.querySelector('.popup__input_type_element-name');
    const linkInput = addElementsForm.querySelector('.popup__input_type_link');

    const name = titleInput.value;
    const link = linkInput.value;

    const cardData = {
        name,
        link,
    };

    renderCardElement(createCardElement(cardData));
    closePopup(addElementsPopup);

};

addElementsForm.addEventListener('submit', handleAddElementsSubmit);

//закрытие add попапа нажатием на крестик
    addButtonPopupCloseButton.addEventListener('click', () => {
    addElementsPopup.classList.remove("popup_opened");
});


//закрытие image попапа нажатием на крестик
const imagePopupCloseBtn = document.querySelector('.popup__close-image');

imagePopupCloseBtn.addEventListener('click', () => {
    imagePopup.classList.remove("popup_opened");
});