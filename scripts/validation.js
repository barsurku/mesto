function enableValidation({ formSelector, inputSelector, ...rest }) {
    console.log(rest);
    const popupForms = document.querySelectorAll(formSelector);
  
    const popupFormsArray = Array.from(popupForms);
  
    popupFormsArray.forEach(function (popupForms) {
      popupForms.addEventListener("submit", (event) => {
        event.preventDefault();
        toggleButtonValidity(rest, popupForms);
      });
  
      toggleButtonValidity(rest, popupForms);
      const popupInputs = popupForms.querySelectorAll(inputSelector);
      const inputsArray = Array.from(popupInputs);
      inputsArray.forEach(function (input) {
        input.addEventListener("input", () => {
          checkInputValidity(rest, input);
  
          //проврека кнопки submit
          toggleButtonValidity(rest, popupForms);
        });
      });
    });
  }
  
  //valid
  function setInputValidState(config, input, errorElement) {
    input.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
  
    //исчезание ошибки
    errorElement.textContent = "";
  }
  
  //invalid
  function setInputInvalidState(config, input, errorElement) {
    input.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
  
    //появление ошибки
    errorElement.textContent = input.validationMessage;
  }
  
  function checkInputValidity(config, input) {
    const errorElement = document.querySelector(`#error-${input.id}`);
  
    //изменение вида валидности
    if (input.checkValidity()) {
      setInputValidState(config, input, errorElement);
    } else {
      setInputInvalidState(config, input, errorElement);
    }
  }
  
  //изменение кнопки submit
  function disableButton(inactiveButtonClass, button) {
    button.setAttribute("disabled", "");
    button.classList.add(inactiveButtonClass);
  }
  
  function enableButton(inactiveButtonClass, button) {
    button.removeAttribute("disabled");
    button.classList.remove(inactiveButtonClass);
  }
  
  function toggleButtonValidity(
    { submitButtonSelector, inactiveButtonClass },
    popupForms
  ) {
    const submitButton = popupForms.querySelector(submitButtonSelector);
  
    if (popupForms.checkValidity()) {
      enableButton(inactiveButtonClass, submitButton);
    } else {
      disableButton(inactiveButtonClass, submitButton);
    }
  }
  
  //конфиг
  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_invalid",
    errorClass: "popup__input-error_visible",
  });