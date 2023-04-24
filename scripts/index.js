const editButton = document.querySelector(".profile__edit-button");
const editButtonPopup = document.querySelector(".popup_type_edit-button");
const editButtonPopupCloseButton = editButtonPopup.querySelector(".popup__close");
const nameInput = editButtonPopup.querySelector(".popup__input_type_name");
const nameProfile = document.querySelector(".profile__title_popup");
const infoInput = editButtonPopup.querySelector(".popup__input_type_info");
const infoProfile = document.querySelector(".profile__subtitle_popup");
const editButtonPopupForm = editButtonPopup.querySelector(".popup__form");



//Отрытие попапа
editButton.addEventListener('click', () => {
    console.log("click");

    editButtonPopup.classList.add("popup_opened");

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
    editButtonPopup.classList.remove("popup_opened");

    nameProfile.textContent = nameInput.value;
    infoProfile.textContent = infoInput.value;
});
