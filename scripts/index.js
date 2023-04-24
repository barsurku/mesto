const editButton = document.querySelector(".profile__edit-button");
const editButtonPopup = document.querySelector(".popup_type_edit-button");
const editButtonPopupCloseButton = editButtonPopup.querySelector(".popup__close");
const nameInput = editButtonPopup.querySelector(".popup__input_type_name");
const nameProfile = document.querySelector(".profile__title_popup");
const infoInput = editButtonPopup.querySelector(".popup__input_type_info");
const infoProfile = document.querySelector(".profile__subtitle_popup");
const editButtonPopupSubmit = editButtonPopup.querySelector(".popup__submit");
const editButtonPopupForm = editButtonPopup.querySelector(".popup__form");



//Отрытие попапа
editButton.addEventListener('click', () => {
    console.log("click");

    editButtonPopup.classList.add("popup_open");

    nameInput.value = nameProfile.textContent;
    infoInput.value = infoProfile.textContent;
});

//закрытие попапа нажатием на крестик
editButtonPopupCloseButton.addEventListener('click', () => {
    editButtonPopup.classList.remove("popup_open");
});

//Имя
editButtonPopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    editButtonPopup.classList.remove("popup_open");

    nameProfile.innerHTML = nameInput.value;
});

//О себе
editButtonPopupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    infoProfile.innerHTML = infoInput.value;

});
